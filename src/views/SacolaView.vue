<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const sacola = ref([])
const loading = ref(true)
const error = ref(null)

const token = localStorage.getItem('access_token')
const refreshToken = localStorage.getItem('refresh_token')

// Instância do Axios
const api = axios.create({
  baseURL: API_BASE,
  headers: { Authorization: token ? `Bearer ${token}` : '' }
})

// Função para atualizar token expirado
async function refreshAccessToken() {
  if (!refreshToken) return false
  try {
    const res = await axios.post(`${API_BASE}/token/refresh/`, { refresh: refreshToken })
    localStorage.setItem('access_token', res.data.access)
    api.defaults.headers.Authorization = `Bearer ${res.data.access}`
    return true
  } catch {
    console.warn('Refresh token inválido ou expirado')
    return false
  }
}

// Buscar itens da sacola
async function fetchSacola() {
  loading.value = true
  error.value = null
  try {
    const res = await api.get('/sacola/')
    const data = res.data

    // Garante que sacola sempre seja um array
    sacola.value = Array.isArray(data) ? data : data.results || []

  } catch (err) {
    if (err.response?.status === 401 && await refreshAccessToken()) {
      // tenta novamente com novo token
      return fetchSacola()
    }
    console.error("Erro ao buscar sacola:", err)
    error.value = err.response?.data?.detail || "Erro desconhecido ao carregar sacola"
  } finally {
    loading.value = false
  }
}

// Remover item da sacola
async function removeItem(itemId) {
  try {
    await api.delete(`/sacola/${itemId}/`)
    sacola.value = sacola.value.filter(item => item.id !== itemId)
  } catch (err) {
    console.error("Erro ao remover item:", err)
    alert("Não foi possível remover o item.")
  }
}

// Calcular total
const total = computed(() => {
  if (!Array.isArray(sacola.value)) return 0
  return sacola.value.reduce(
    (sum, item) => sum + (item.produto?.preco || 0) * (item.quantidade || 1),
    0
  )
})

onMounted(fetchSacola)
</script>

<template>
  <div class="sacola-container">
    <h1>Sacola de Compras</h1>

    <div v-if="loading">Carregando...</div>
    <div v-else-if="error" style="color: tomato;">{{ error }}</div>
    <div v-else-if="sacola.length === 0">Sua sacola está vazia.</div>

    <div v-else>
      <div class="item" v-for="item in sacola" :key="item.id">
        <img :src="item.produto?.imagem_produto || '/fallback.png'" alt="Produto" />
        <div class="info">
          <h2>{{ item.produto?.nome || 'Produto sem nome' }}</h2>
          <p>
            Preço:
            R$ {{ item.produto?.preco?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0,00' }}
          </p>
          <p>Quantidade: {{ item.quantidade || 1 }}</p>
          <button @click="removeItem(item.id)">Remover</button>
        </div>
      </div>

      <div class="total">
        <h2>Total: R$ {{ total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sacola-container {
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.item {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}

.item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
}

.info h2 {
  margin: 0 0 0.5rem 0;
}

.info p {
  margin: 0.2rem 0;
}

.info button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.info button:hover {
  background-color: #84827e;
}

.total {
  text-align: right;
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
