<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import Menu from '@/components/Menu.vue'

const router = useRouter()
const route = useRoute()

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const products = ref([])
const tipos = ref([])
const loading = ref(true)
const error = ref(null)

const selectedTypeId = ref(null)
const selectedTypeName = ref("")

// 🧠 Buscar produtos
async function fetchProducts() {
  loading.value = true
  error.value = null
  try {
    const res = await axios.get(`${API_BASE}/produtos/`)
    products.value = res.data.results || res.data
  } catch (err) {
    console.error(err)
    error.value = err
  } finally {
    loading.value = false
  }
}

// 🧠 Buscar tipos
async function fetchTipos() {
  try {
    const res = await axios.get(`${API_BASE}/tipos/`)
    tipos.value = res.data.results || res.data
  } catch (err) {
    console.error("Erro ao buscar tipos:", err)
  }
}

// 🧩 Ler o tipo da URL e achar o nome
function loadTipoFromURL() {
  selectedTypeId.value = Number(route.query.tipo)
  if (tipos.value.length > 0 && selectedTypeId.value) {
    const tipoObj = tipos.value.find(t => t.id === selectedTypeId.value)
    selectedTypeName.value = tipoObj ? tipoObj.nome : ""
  } else {
    selectedTypeName.value = ""
  }
}

// 👀 Atualiza se a rota mudar
watch(() => route.query, loadTipoFromURL, { immediate: true })

// 🚀 Inicialização
onMounted(async () => {
  await fetchTipos()
  loadTipoFromURL()
  await fetchProducts()
  await carregarFavoritos()
})

// 🔍 Filtra produtos pelo tipo selecionado
const filteredProducts = computed(() => {
  if (!selectedTypeId.value) return products.value
  return products.value.filter(p => {
    const tipoId = typeof p.tipo === "object" ? p.tipo.id : p.tipo
    return tipoId === selectedTypeId.value
  })
})

// 💰 Formatar preço
function fmtPrice(value) {
  if (value == null) return '0,00'
  return Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

// 🛍️ Adicionar à sacola (backend + localStorage)
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

// ❤️ Favoritar / desfavoritar
async function toggleFavorito(produto) {
  console.log("ID do produto:", produto.id)

  try {
    const token = localStorage.getItem('access_token')
    if (!token) {
      alert('Você precisa estar logado para adicionar aos favoritos')
      return
    }

    // 🔹 Verifica se já está favoritado
    const res = await axios.get(`${API_BASE}/favoritos/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const favoritos = Array.isArray(res.data.results) ? res.data.results : res.data
    const jaFavoritado = favoritos.find(f => f.produto?.id === produto.id)

    if (jaFavoritado) {
      // 🧹 Remove do backend
      await axios.delete(`${API_BASE}/favoritos/${jaFavoritado.id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      produto.isFavorito = false
      alert(`${produto.nome} removido dos favoritos`)
    } else {
      // 💾 Adiciona ao backend
      await axios.post(
        `${API_BASE}/favoritos/`,
        { produto_id: produto.id },  // <- aqui estava errado
        { headers: { Authorization: `Bearer ${token}` } }
      )

      produto.isFavorito = true
      alert(`${produto.nome} adicionado aos favoritos`)
    }

    await carregarFavoritos()

  } catch (err) {
    console.error("Erro ao gerenciar favorito:", err.response?.data || err)
    alert("❌ Não foi possível atualizar o favorito.")
  }
}

// ❤️ Carregar status dos favoritos
async function carregarFavoritos() {
  const token = localStorage.getItem('access_token')
  if (!token) return

  try {
    const res = await axios.get(`${API_BASE}/favoritos/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const favoritos = Array.isArray(res.data.results) ? res.data.results : res.data

    products.value = products.value.map(p => ({
      ...p,
      isFavorito: favoritos.some(f => f.produto?.id === p.id)
    }))
  } catch (err) {
    console.error("Erro ao buscar favoritos:", err)
  }
}

// 🔗 Ir para página do produto
function goToProduto(produtoId) {
  router.push({ path: '/especificacao', query: { id: produtoId } })
}
</script>

<template>
   <Menu/>

<div v-if="loading" class="carregando">Carregando produto...</div>
  <div>
    <div class="titulo">
      <h1>
        {{ selectedTypeName ? selectedTypeName.toUpperCase() : 'TODOS OS PRODUTOS' }}
      </h1>
    </div>

    <div v-if="loading" style="padding:24px">Carregando produtos...</div>
    <div v-if="error" style="color:tomato; padding:24px">Erro ao carregar produtos</div>

    <div class="card-container" v-else>
      <div class="card" v-for="produto in filteredProducts" :key="produto.id">
        <div class="informacoes">
          <div class="colecao">
            <h2>
              <router-link :to="`/colecao/${produto.colecao.id}`" @click.stop>
                {{ produto.colecao.nome }}
              </router-link>
            </h2>
            <img :src="produto.isFavorito ? '/heart-full.png' : '/heart-empty.png'" alt="Favorito" class="icon-favorito"
              @click.stop="toggleFavorito(produto)" />
          </div>

          <div class="imagem-card" @click="goToProduto(produto.id)">
            <img :src="produto.imagem_produto || produto.colecao?.imagem_mostruario || '/fallback.png'" alt="Normal"
              class="normal" />
            <img
              :src="produto.imagem_amostra || produto.colecao?.imagem_mostruario || produto.imagem_produto || '/fallback.png'"
              alt="Molhado" class="hover" />
          </div>

          <div class="titulo-card">{{ produto.nome }}</div>
          <div class="descricao-card">
            {{ produto.descricao_colecao || produto.colecao?.descricao || '' }}
          </div>

          <div class="valor-card">
            <div class="escrita-valor">R$</div>
            <div class="numero-valor">{{ fmtPrice(produto.preco) }}</div>
          </div>

          <div class="botao-card">
            <button @click.stop="addToCart(produto)">Adicionar à sacola</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');



.banner1 img {
  width: 145vh;
  height: 430px;
  z-index: 1;
  border-radius: 20px;
  margin-left: 30px;
}


:deep(.colecao a) {
  color: inherit;
  text-decoration: none;
  font-weight: 600;
}

:deep(.colecao a:hover) {
  color: #84827e;
  transition: color 0.3s ease;
}

.colecao a {
  color: inherit;
  text-decoration: none;
  font-weight: 600;
  margin-left: -20px;
}

.colecao a:hover {
  color: #84827e;
  transition: color 0.3s ease;
}


.card-container {
  display: grid;
  grid-template-columns: repeat(5, 250px);
  justify-content: center;
  gap: 30px;
    margin: 0 auto; /* centraliza o grid */
  padding: 40px;
}


.titulo {
  background-color: black;
  width: 100%;
  max-width: 1200px;
  height: 130px;
  border-radius: 20px;
  margin: 100px auto 40px auto; /* centraliza horizontalmente */
  display: flex;
  align-items: center;
  justify-content: center;
}

.titulo h1 {
  font-size: 3rem;
  color: #ffffff;
  text-align: center;
  font-weight: 700;
  margin: 0;
}










.card {
    box-shadow: 0 6px 20px rgba(0, 0, 0, .40);
    height: 430px;
    /* altura fixa */
    border-radius: 20px;
    cursor: pointer;
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background-color: #fff;
}


.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.informacoes {
  width: 100%;
}

.colecao {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  width: 100%;
}

.colecao h2 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.colecao a {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;
}

.colecao a:hover {
  color: #84827e;
}

.icon-favorito {
  width: 22px;
  height: 22px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.icon-favorito:hover {
  transform: scale(1.2);
}



/* Imagem do produto */
.imagem-card {
    position: relative;
    width: 180px;
    height: 180px;
    margin-bottom: 10px;

    margin: 10px 0;
  flex-shrink: 0;
}

.imagem-card img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 20px;
  transition: opacity 0.5s ease;
}


.imagem-card img.hover {
    opacity: 0;
}

.imagem-card:hover img.normal {
    opacity: 0;
}

.imagem-card:hover img.hover {
    opacity: 1;
}

/* Título e descrição */
.titulo-card {
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: -10px;
  text-align: center;
}


.descricao-card {
  font-size: 0.85rem;
  text-align: center;
  color: #444;
  height: 60px; /* altura fixa pra evitar deslocamento */
  overflow: hidden;
}
/* Preço */
.valor-card {
    display: flex;
    margin-left: 100px;
    margin-top: 6px;
  align-items: flex-end;

}

.escrita-valor {
    font-size: 1.1rem;
    margin-top: 10px;
}

.numero-valor {
    font-size: 2rem;
    font-weight: 600;
    margin-top: -5px;
}

/* Botão adicionar à sacola */
.botao-card {
    display: flex;
    justify-content: center;

  }
.botao-card button {
    width: 170px;
    height: 45px;
    margin-top: 5px;
    text-decoration: none;
    border: none;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    background-color: transparent;
    border-radius: 40px;
    font-size: 1rem;
    font-weight: 600;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    transition: all 0.4s ease;
}

.botao-card button:hover {
    background-color: #84827e;
    border: #84827e;
    color: #ffffff;
    
}
</style>
