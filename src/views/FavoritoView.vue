<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
const favoritos = ref([])
const loading = ref(true)
const error = ref(null)

async function fetchFavoritos() {
  try {
    const token = localStorage.getItem('access_token')
    if (!token) {
      error.value = 'Você precisa estar logado para ver seus favoritos.'
      return
    }

    const res = await axios.get(`${API_BASE}/favoritos/`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    favoritos.value = Array.isArray(res.data.results) ? res.data.results : res.data
  } catch (err) {
    console.error(err)
    error.value = 'Erro ao carregar favoritos.'
  } finally {
    loading.value = false
  }
}

async function removerFavorito(id) {
  try {
    const token = localStorage.getItem('access_token')
    if (!token) return

    await axios.delete(`${API_BASE}/favoritos/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    favoritos.value = favoritos.value.filter(f => f.id !== id)
  } catch (err) {
    console.error('Erro ao remover favorito:', err)
  }
}

onMounted(fetchFavoritos)
</script>

<template>
  <div class="favoritos-page">
    <h1>MEUS FAVORITOS ❤️</h1>

    <div v-if="loading" class="loading">Carregando...</div>
    <div v-else-if="error" class="erro">{{ error }}</div>

    <div v-else class="grid-favoritos">
      <div class="card" v-for="fav in favoritos" :key="fav.id">
        <img :src="fav.produto?.imagem_produto || '/fallback.png'" alt="Produto" class="img-produto" />
        <h3>{{ fav.produto?.nome || 'Produto' }}</h3>
        <p>R$ {{ Number(fav.produto.preco || 0).toFixed(2).replace('.', ',') }}</p>
        <button @click="removerFavorito(fav.id)">Remover</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.favoritos-page {
  padding: 40px;
  font-family: "Poppins", sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.grid-favoritos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
}

.card {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 15px;
  text-align: center;
}

.img-produto {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
}

button {
  background: #84827e;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 25px;
  margin-top: 10px;
  cursor: pointer;
  font-weight: 600;
}

button:hover {
  background: black;
}
</style>
