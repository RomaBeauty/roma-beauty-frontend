<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Menu from '@/components/Menu.vue'

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
const sacola = ref([])
const loading = ref(true)
const error = ref(null)
const router = useRouter()

const token = localStorage.getItem('access_token')
const refreshToken = localStorage.getItem('refresh_token')

// Instância do Axios
const api = axios.create({
  baseURL: API_BASE,
  headers: { Authorization: token ? `Bearer ${token}` : '' }
})

// Atualizar token expirado
async function refreshAccessToken() {
  if (!refreshToken) return false
  try {
    const res = await axios.post(`${API_BASE}/token/refresh/`, { refresh: refreshToken })
    localStorage.setItem('access_token', res.data.access)
    api.defaults.headers.Authorization = `Bearer ${res.data.access}`
    return true
  } catch {
    return false
  }
}

// Buscar itens da sacola
async function fetchSacola() {
  loading.value = true
  error.value = null
  try {
    const res = await api.get('/sacola/')
    sacola.value = Array.isArray(res.data) ? res.data : res.data.results || []
  } catch (err) {
    if (err.response?.status === 401 && await refreshAccessToken()) return fetchSacola()
    error.value = err.response?.data?.detail || "Erro desconhecido ao carregar sacola"
  } finally {
    loading.value = false
  }
}

// Remover item
async function removeItem(itemId) {
  try {
    await api.delete(`/sacola/${itemId}/`)
    sacola.value = sacola.value.filter(item => item.id !== itemId)
  } catch (err) {
    alert("Não foi possível remover o item.")
  }
}

// Total
const total = computed(() => sacola.value.reduce(
  (sum, item) => sum + (item.produto?.preco || 0) * (item.quantidade || 1), 0
))

// Ir para página de compra
function irParaCompra() {
  router.push({ path: '/compra', query: { sacola: JSON.stringify(sacola.value) } })
}

onMounted(fetchSacola)
</script>

<template>
  <Menu />

  <div v-if="loading" class="carregando">Carregando produto...</div>
  <div class="sacola-container">
    <h1>SACOLA DE COMPRAS</h1>

    <div v-if="loading">Carregando...</div>
    <div v-else-if="error" style="color: tomato">{{ error }}</div>
    <div v-else-if="sacola.length === 0">Sua sacola está vazia.</div>

    <div v-else>
      
      <div class="item" v-for="item in sacola" :key="item.id">
        <img :src="item.produto?.imagem_produto || '/fallback.png'" alt="Produto" />
        <div class="info">
          <h2>{{ item.produto?.nome || 'Produto' }}</h2>
          <p>Preço: R$ {{ (item.produto?.preco || 0).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 }) }}</p>
          <p>Quantidade: {{ item.quantidade || 1 }}</p>
          <p>Subtotal: R$ {{ ((item.produto?.preco || 0) * (item.quantidade || 1)).toLocaleString('pt-BR', {
            minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</p>
          <button @click="removeItem(item.id)">Remover</button>
        </div>
      </div>

      <div class="total">
        <h2>Total: R$ {{ total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</h2>
      </div>

      <button class="finalizar" @click="irParaCompra">Finalizar Compra</button>
    </div>
  </div>
</template>

<style scoped>
.sacola-container {
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
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

.finalizar {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  width: 300px;
  height: 60px;
  margin-left: 80%;  
  font-size: 1.2rem;
  border: 2px solid #000;
  cursor: pointer;
  font-weight: 600;
    transition: ease all 1s;

}

.finalizar:hover {
  transform: scale(1.00);
  background-color: #fff;
  color: #000;
  border: 2px solid #000;
  transition: ease all 1s;
}

.sacola-container {
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
}

.sacola-container h1{
  margin-top: 80px;
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
  transition: ease all 1s;
}

.total {
  text-align: right;
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
}



.item {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: #f8f8f8;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.item:hover {
  transform: scale(1.02);
}
.item img {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid #ddd;
}
.info h2 {
  font-size: 1.3rem;
  color: #333;
  font-weight: 600;
}
.total {
  position: sticky;
  bottom: 0;
  background-color: #fff;
  padding: 1rem;
  border-top: 2px solid #000;
  text-align: right;
  font-size: 1.5rem;
  font-weight: 600;
}



</style>
