<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const colecaoId = route.params.id
const produtos = ref([])
const colecao = ref(null)
const loading = ref(true)
const error = ref(null)

async function fetchColecao() {
  loading.value = true
  error.value = null
  try {
    const resProdutos = await axios.get(`${API_BASE}/produtos/?page_size=1000`)
    produtos.value = resProdutos.data.results.filter(p => p.colecao?.id == colecaoId)

    const resColecao = await axios.get(`${API_BASE}/colecoes/${colecaoId}/`)
    colecao.value = resColecao.data
  } catch (err) {
    console.error(err)
    error.value = err
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchColecao())

function fmtPrice(value) {
  if (value == null) return '0,00'
  return Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function addToCart(produto) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  cart.push({
    id: produto.id,
    nome: produto.nome,
    preco: produto.preco,
    imagem: produto.imagem_produto
  })
  localStorage.setItem('cart', JSON.stringify(cart))
  alert(`${produto.nome} adicionado à sacola`)
}

function goToColecao(colecaoId) {
  router.push(`/colecoes/${colecaoId}`)
}
</script>

<template>
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
              <router-link :to="`/colecoes/${produto.colecao?.id}`">
                {{ produto.colecao?.nome || colecao?.nome }}
              </router-link>
            </h2>
            <i class="fa-regular fa-heart"></i>
          </div>

          <div class="imagem-card">
            <img
              :src="produto.imagem_produto || produto.colecao?.imagem_mostruario || '/fallback.png'"
              alt="Normal"
              class="normal"
            />
            <img
              :src="produto.imagem_amostra || produto.colecao?.imagem_mostruario || produto.imagem_produto || '/fallback.png'"
              alt="Hover"
              class="hover"
            />
          </div>

          <div class="titulo-card">{{ produto.nome }}</div>
          <div class="descricao-card">{{ produto.descricao_colecao || produto.colecao?.descricao || '' }}</div>

          <div class="valor-card">
            <div class="escrita-valor">R$</div>
            <div class="numero-valor">{{ fmtPrice(produto.preco) }}</div>
          </div>

          <div class="botao-card">
            <button @click="addToCart(produto)">Adicionar à sacola</button>
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

.escrita-valor {
  font-size: 1.1rem;
  margin-top: 16.5px;
}

.descricao-card {
  width: 220px;
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

.botao-card button {
  width: 120px;
  height: 35px;
  text-decoration: none;
  border: none;
  box-shadow: 0 3px 10px rgba(0, 0, 0, .20);
  margin-top: 5px;
  background-color: transparent;
  border-radius: 40px;
  margin-left: 40px;
  font-size: .9rem;
  font-weight: 600;
  font-family: "Poppins", sans-serif;

}

.botao-card button:hover {
  background-color: #84827e;
  border: #84827e;
  transition: ease 1s;
  color: #ffffff;

}



.titulo-card {
  font-size: 1.1rem;
  margin-top: 3px;
  font-weight: 700;
}

.descricao-card {
  font-size: .9rem;
}

.imagem-card {
  position: relative;
  width: 180px;
  height: 180px;
}

.imagem-card img {
  position: absolute;
  top: 0;
  left: 0;
  width: 180px;
  height: 180px;
  transition: opacity 0.5s ease;
  margin-left: 10px;
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



.colecao {
  display: grid;
  grid-template-columns: 168px 80px;
}

.colecao i {
  font-size: 1.7rem;
  margin-top: 20px;

}

.informacoes {
  margin-left: 20px;
  font-family: "Poppins", sans-serif;

}

.card {
  box-shadow: 0 6px 20px rgba(0, 0, 0, .40);
  height: 430px;
  border-radius: 20px;
}

.card-container {
  display: grid;
  grid-template-columns: 250px 250px 250px 250px 250px;
  gap: 30px;
  font-family: "Poppins", sans-serif;
  margin-top: 50px;
  margin-left: 75px;
}

.titulo {
  background-color: black;
  width: 200vh;
  height: 130px;
  border-radius: 20px;
  margin-left: 65px;
}

.titulo h1 {
  font-size: 4rem;
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  justify-content: center;
  /* Centraliza horizontalmente */
  display: flex;

}

/*FILTRAGEM*/

.filtragem {
  font-family: 'Poppins', sans-serif;
  margin-top: 50px;
  text-align: center;
  font-size: 1rem;
  margin-left: 140px;
  font-weight: 600;
}

.filtros {
  display: flex;
  margin-top: 40px;
  gap: 10px;

}

.filtro {
  box-shadow: 0 6px 20px rgba(0, 0, 0, .40);
  border-radius: 40px;
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  /* Centraliza horizontalmente */
  align-items: center;
}

.filtro:hover {
  background-color: #84827e;
  transition: ease .5s;
  color: #ffffff;
}

.filtro i {
  margin-right: 10px;
  margin-top: -5px;
}
</style>