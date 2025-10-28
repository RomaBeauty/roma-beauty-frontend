<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Menu from '@/components/Menu.vue'
import Footer from "@/components/Footer.vue"


const route = useRoute()
const router = useRouter()

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const colecaoId = route.params.id
const produtos = ref([])
const colecao = ref(null)
const loading = ref(true)
const error = ref(null)

// ❤️ Favoritos
async function carregarFavoritos() {
  const token = localStorage.getItem('access_token')
  if (!token) return

  try {
    const res = await axios.get(`${API_BASE}/favoritos/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const favoritos = Array.isArray(res.data.results) ? res.data.results : res.data
    produtos.value = produtos.value.map(p => ({
      ...p,
      isFavorito: favoritos.some(f => f.produto?.id === p.id)
    }))
  } catch (err) {
    console.error("Erro ao buscar favoritos:", err)
  }
}

// 🔹 Buscar produtos da coleção
async function fetchColecao() {
  loading.value = true
  error.value = null
  try {
    const resProdutos = await axios.get(`${API_BASE}/produtos/?page_size=1000`)
    produtos.value = resProdutos.data.results.filter(p => p.colecao?.id == colecaoId)

    const resColecao = await axios.get(`${API_BASE}/colecoes/${colecaoId}/`)
    colecao.value = resColecao.data

    await carregarFavoritos() // Atualiza o status de favorito
  } catch (err) {
    console.error(err)
    error.value = err
  } finally {
    loading.value = false
  }
}

// 🔹 Formatar preço
function fmtPrice(value) {
  if (value == null) return '0,00'
  return Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// 🔹 Adicionar ao carrinho
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
      await axios.patch(`${API_BASE}/sacola/${itemExistente.id}/`, { quantidade: itemExistente.quantidade + 1 }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert(`${produto.nome} atualizado na sacola!`)
    } else {
      await axios.post(`${API_BASE}/sacola/`, { produto_id: produto.id, quantidade: 1 }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert(`${produto.nome} adicionado à sacola!`)
    }
  } catch (err) {
    console.error("Erro ao adicionar à sacola:", err.response?.data || err)
    alert("❌ Não foi possível adicionar o produto à sacola.")
  }
}

// ❤️ Favoritar / desfavoritar
async function toggleFavorito(produto) {
  try {
    const token = localStorage.getItem('access_token')
    if (!token) {
      alert('Você precisa estar logado para adicionar aos favoritos')
      return
    }

    const res = await axios.get(`${API_BASE}/favoritos/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const favoritos = Array.isArray(res.data.results) ? res.data.results : res.data
    const jaFavoritado = favoritos.find(f => f.produto?.id === produto.id)

    if (jaFavoritado) {
      await axios.delete(`${API_BASE}/favoritos/${jaFavoritado.id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      produto.isFavorito = false
      alert(`${produto.nome} removido dos favoritos`)
    } else {
      await axios.post(`${API_BASE}/favoritos/`, { produto_id: produto.id }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      produto.isFavorito = true
      alert(`${produto.nome} adicionado aos favoritos`)
    }

    await carregarFavoritos()
  } catch (err) {
    console.error("Erro ao gerenciar favorito:", err.response?.data || err)
    alert("❌ Não foi possível atualizar o favorito.")
  }
}

// 🔹 Ir para página de produto
function goToProduto(produtoId) {
  router.push({ path: '/especificacao', query: { id: produtoId } })
}

onMounted(() => fetchColecao())
</script>


<template>
   <Menu/>

<div v-if="loading" class="carregando">Carregando produto...</div>
  <div>
    <div class="titulo">
      <h1>{{ colecao?.nome || 'Coleção' }}</h1>
    </div>

    <div v-if="loading" style="padding:24px">Carregando produtos...</div>
    <div v-if="error" style="color:tomato; padding:24px">Erro ao carregar produtos</div>

    <div class="card-container" v-else>
      <div class="card" v-for="produto in produtos" :key="produto.id">
        <div class="informacoes">
          <div class="colecao">
            <h2>
              <router-link :to="`/colecoes/${produto.colecao?.id}`" @click.stop>
                {{ produto.colecao?.nome || colecao?.nome }}
              </router-link>
            </h2>
            <img :src="produto.isFavorito ? '/heart-full.png' : '/heart-empty.png'" alt="Favorito" class="icon-favorito"
              @click.stop="toggleFavorito(produto)" />
          </div>

          <div class="imagem-card" @click="goToProduto(produto.id)">
            <img :src="produto.imagem_produto || produto.colecao?.imagem_mostruario || '/fallback.png'" alt="Normal"
              class="normal" />
            <img :src="produto.imagem_amostra || produto.colecao?.imagem_mostruario || produto.imagem_produto || '/fallback.png'"
              alt="Hover" class="hover" />
          </div>

          <div class="titulo-card">{{ produto.nome }}</div>
          <div class="descricao-card">{{ produto.descricao_colecao || produto.colecao?.descricao || '' }}</div>

          <div class="valor-card">
            <div class="escrita-valor">R$</div>
            <div class="numero-valor">{{ fmtPrice(produto.preco) }}</div>
          </div>

          <div class="botao-card">
            <button @click.stop="addToCart(produto)">Adicionar à sacola</button>
          </div>
        </div>
      </div> <div v-if="colecao?.imagem_mostruario" class="colecao-imagem-normal">
      <img :src="colecao.imagem_mostruario" :alt="colecao.nome" />
    </div>
    </div>

   
  </div>
  <Footer/>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Merriweather:wght@400;700;900&family=Montserrat:wght@400;700&family=Playfair+Display:wght@400;700;900&family=Poppins:wght@400;500;600;700&family=Work+Sans:wght@400;600;700&display=swap');

.colecao {
  display: flex;
  align-items: center;
  padding: 0 10px; /* margem interna */
  justify-content: space-between;

}

.colecao h2 {
  font-size: 1.1rem;
  font-weight: 600;

}


.icon-favorito {
  width: 22px;
  height: 22px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.icon-favorito:hover {
  transform: scale(1.15);
}

.colecao-imagem-normal {
  display: flex;
  justify-content: center;
}

.colecao-imagem-normal img {
  width: 540px;
  height: 70%;
  margin-top: 50px;
  margin-left: 280px;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, .40);
}

.escrita-valor {
  font-size: 1.1rem;
  margin-top: 16.5px;
}


.descricao-card {
  font-size: 0.85rem;
  text-align: center;
  color: #444;
  height: 45px; /* altura fixa pra evitar deslocamento */
  overflow: hidden;
}

.numero-valor {
  font-size: 2rem;
  font-weight: 600;
}

.valor-card {
  display: flex;
  margin-left: 100px;
  margin-top: 2px;
}

.titulo-card {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 auto; /* centraliza horizontalmente */
  text-align: center;
}

.descricao-card {
  font-size: .9rem;
}

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

}

.colecao a:hover {
  color: #84827e;
  transition: color 0.3s ease;
}

.informacoes {
  font-family: "Poppins", sans-serif;
  margin: 0 10px;
   justify-content: center;
}

.card {
  box-shadow: 0 6px 20px rgba(0, 0, 0, .40);
  height: 430px;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.2s ease;
    background-color: #fff;

}


.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}





.card-container {
  display: grid;
  grid-template-columns: repeat(5, 250px);
  gap: 30px;
  font-family: "Poppins", sans-serif;
 margin: 50px auto 0 auto; /* centraliza horizontalmente */
  justify-content: center; 
}

.titulo {
  background-color: black;
  width: 200vh;
  height: 130px;
  border-radius: 20px;
   justify-content: center;
  align-items: center;
  display: flex;
    margin: 100px auto 0 auto; /* topo | lados automáticos | baixo */

}

.titulo h1 {
  font-size: 4rem;
  font-family: "Poppins", sans-serif;
  color: #ffffff;

}


</style>
