<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"

const router = useRouter()

const API_URL_PRODUTOS = "http://127.0.0.1:8000/api/produtos/"
const API_URL_FAVORITOS = "http://127.0.0.1:8000/api/favoritos/"
const API_URL_SACOLA = "http://127.0.0.1:8000/api/sacola/"

const produtosAleatorios = ref([])

// ---- Carregar produtos ----
async function fetchProdutosAleatorios() {
  try {
    const res = await axios.get(API_URL_PRODUTOS)
    const todosProdutos = res.data.results || res.data
    produtosAleatorios.value = [...todosProdutos].sort(() => Math.random() - 0.5).slice(0, 5)
    await carregarFavoritos()
  } catch (err) {
    console.error("Erro ao buscar produtos:", err)
  }
}

// ---- Favoritos ----
async function carregarFavoritos() {
  const token = localStorage.getItem("access_token")
  if (!token) return
  try {
    const res = await axios.get(API_URL_FAVORITOS, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const favoritos = res.data.results || res.data
    produtosAleatorios.value = produtosAleatorios.value.map(p => ({
      ...p,
      isFavorito: favoritos.some(f => f.produto?.id === p.id)
    }))
  } catch (err) {
    console.error("Erro ao buscar favoritos:", err)
  }
}

async function toggleFavorito(produto) {
  const token = localStorage.getItem("access_token")
  if (!token) {
    alert("Você precisa estar logado para favoritar")
    return
  }
  try {
    const res = await axios.get(API_URL_FAVORITOS, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const favoritos = res.data.results || res.data
    const jaFavorito = favoritos.find(f => f.produto?.id === produto.id)

    if (jaFavorito) {
      await axios.delete(`${API_URL_FAVORITOS}${jaFavorito.id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      produto.isFavorito = false
    } else {
      await axios.post(
        API_URL_FAVORITOS,
        { produto_id: produto.id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      produto.isFavorito = true
    }
  } catch (error) {
    console.error("Erro ao favoritar:", error)
  }
}

async function adicionarSacola(produto) {
  const token = localStorage.getItem("access_token")
  if (!token) {
    alert("Você precisa estar logado para adicionar à sacola")
    return
  }

  try {
    const res = await axios.get(API_URL_SACOLA, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const sacolaAtual = res.data.results || res.data
    const existente = sacolaAtual.find(item => item.produto?.id === produto.id)

    if (existente) {
      await axios.patch(
        `${API_URL_SACOLA}${existente.id}/`,
        { quantidade: existente.quantidade + 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert(`${produto.nome} atualizado na sacola!`)
    } else {
      await axios.post(
        API_URL_SACOLA,
        { produto_id: produto.id, quantidade: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert(`${produto.nome} adicionado à sacola!`)
    }
  } catch (error) {
    console.error("Erro ao adicionar à sacola:", error)
  }
}

function goToProduto(produtoId) {
  router.push({ path: "/especificacao", query: { id: produtoId } })
}

onMounted(() => {
  fetchProdutosAleatorios()
})
</script>

<template>
  <section class="produtos-home">
    <div class="card-container">
        <div class="card" v-for="produto in produtosAleatorios" :key="produto.id" @click="goToProduto(produto.id)">
            <div class="colecao">
          <h2>{{ produto.colecao?.nome }}</h2>
          <img
            :src="produto.isFavorito ? '/heart-full.png' : '/heart-empty.png'"
            class="icon-favorito"
            @click.stop="toggleFavorito(produto)"
          />
        </div>

        <div class="imagem-card" @click="goToProduto(produto.id)">
          <img
            :src="produto.imagem_produto || produto.colecao?.imagem_mostruario || '/fallback.png'"
            class="normal"
          />
          <img :src="produto.imagem_amostra || produto.colecao?.imagem_mostruario || produto.imagem_produto || '/fallback.png'"
                        alt="Hover" class="hover" />
        </div>

        <div class="titulo-card">{{ produto.nome }}</div>
        <div class="descricao-card">
          {{ produto.descricao_colecao || produto.colecao?.descricao || "" }}
        </div>

        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">
            {{
              produto.preco?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }) || "0,00"
            }}
          </div>
        </div>

        <div class="botao-card">
          <button @click.stop="adicionarSacola(produto)">Adicionar à sacola</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Container dos cards */
.card-container {
    display: grid;
    gap: 30px;
    font-family: "Poppins", sans-serif;
    margin-top: 50px;
    /* ou ajustar para centralizar */
    justify-content: center;
    display: grid;
    grid-template-columns: 250px 250px 250px 250px 250px;
    margin-left: -10px;
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
    transform: translateY(-5px);
}

.informacoes {
    margin-left: 20px;
    font-family: "Poppins", sans-serif;
}

.colecao {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.colecao h2 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
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
  left: 0;
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
}

/* Botão adicionar à sacola */
.botao-card {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.botao-card button {
    width: 170px;
    height: 45px;
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
