<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
const favoritos = ref([])
const loading = ref(true)
const error = ref(null)

// 🛍️ Adicionar à sacola
async function addToCart(produto) {
  try {
    const token = localStorage.getItem('access_token')
    if (!token) {
      alert('Você precisa estar logado para adicionar à sacola')
      return
    }

    const res = await axios.get(`${API_BASE}/sacola/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const sacolaBackend = Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data.results)
        ? res.data.results
        : []

    const itemExistente = sacolaBackend.find(item => item.produto?.id === produto.id)

    if (itemExistente) {
      await axios.patch(
        `${API_BASE}/sacola/${itemExistente.id}/`,
        { quantidade: itemExistente.quantidade + 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert(`${produto.nome} atualizado na sacola!`)
    } else {
      await axios.post(
        `${API_BASE}/sacola/`,
        { produto_id: produto.id, quantidade: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert(`${produto.nome} adicionado à sacola!`)
    }
  } catch (err) {
    console.error("Erro ao adicionar à sacola:", err.response?.data || err)
    alert("❌ Não foi possível adicionar o produto à sacola.")
  }
}

// ❤️ Buscar favoritos
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

// ❤️ Remover favorito individual
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

// ❤️ Remover todos favoritos
async function removerTodosFavoritos() {
  const confirmDelete = confirm("Tem certeza que deseja remover todos os favoritos?")
  if (!confirmDelete) return

  try {
    const token = localStorage.getItem('access_token')
    if (!token) return

    // Remove um por um (API REST normalmente não tem batch delete)
    for (const fav of favoritos.value) {
      await axios.delete(`${API_BASE}/favoritos/${fav.id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    }

    favoritos.value = []
  } catch (err) {
    console.error("Erro ao remover todos favoritos:", err)
    alert("❌ Não foi possível remover todos favoritos.")
  }
}

onMounted(fetchFavoritos)
</script>

<template>
  <div class="favoritos-page">
    <h1>MEUS FAVORITOS ❤️</h1>
    <button class="remover-todos" @click="removerTodosFavoritos">Remover todos</button>

    <div v-if="loading" class="loading">Carregando...</div>
    <div v-else-if="error" class="erro">{{ error }}</div>

    <div v-else class="grid-favoritos">
      <div class="card" v-for="fav in favoritos" :key="fav.id">
        <img :src="fav.produto?.imagem_produto || '/fallback.png'" alt="Produto" class="img-produto" />
        <h3>{{ fav.produto?.nome || 'Produto' }}</h3>
        <p>R$ {{ Number(fav.produto.preco || 0).toFixed(2).replace('.', ',') }}</p>

        <div class="botoes-card">
          <button class="remover" @click="removerFavorito(fav.id)">Remover</button>
          <button class="adicionar" @click="addToCart(fav.produto)">Adicionar à sacola</button>
        </div>
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
  margin-bottom: 15px;
}

.remover-todos {
  display: block;
  margin: 0 auto 30px auto;
  padding: 10px 25px;
  border-radius: 30px;
  background: #d9534f;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.remover-todos:hover {
  background: #c9302c;
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

.botoes-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

.botoes-card button {
  border: none;
  border-radius: 25px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
}

.botoes-card .remover {
  background: #84827e;
  color: white;
}

.botoes-card .remover:hover {
  background: black;
}

.botoes-card .adicionar {
  background: #00a651;
  color: white;
}

.botoes-card .adicionar:hover {
  background: #007f3d;
}

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
