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
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    font-family: "Poppins", sans-serif;
    margin-top: 50px;
    margin-left: 0;
    /* ou ajustar para centralizar */
    justify-content: center;
    /* centraliza o grid na tela */
}

.card-container {
    display: grid;
    grid-template-columns: 250px 250px 250px 250px 250px;
    /* mantém igual à página original */
    gap: 30px;
    font-family: "Poppins", sans-serif;
    margin-top: 50px;
    margin-left: 75px;
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

/* Coleção + Favorito */
.colecao {
    display: flex;
    align-items: center;
    gap: 108px;
    margin-bottom: 10px;
}

.colecao h2 {
    margin: 0;
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

/* Imagem do produto */
.imagem-card {
    position: relative;
    width: 180px;
    height: 180px;
    margin-bottom: 10px;
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

/* Título e descrição */
.titulo-card {
    font-size: 1.1rem;
    font-weight: 700;
    margin-top: 3px;
}

.descricao-card {
    width: 220px;
    font-size: 0.9rem;
}

/* Preço */
.valor-card {
    display: flex;
    margin-left: 100px;
    margin-top: 2px;
}

.escrita-valor {
    font-size: 1.1rem;
    margin-top: 16.5px;
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



/*footer*/
.my-footer {
    background-color: #202020;
    padding: 70px 0;
    margin-top: 150px;
    font-family: 'Poppins', sans-serif;
    border-radius: 30px;
}

.my-container {
    width: 1170px;
    margin: auto;
}

.my-row {
    display: flex;
    flex-wrap: wrap;
}

.my-footer-col {
    width: 20%;
    padding: 0 15px;
}

.my-footer-col h4 {
    font-size: 18px;
    color: #ffffff;
    text-transform: capitalize;
    margin-bottom: 35px;
    font-weight: 500;
    position: relative;
}

.my-footer-col h4::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    background-color: #ffffff;
    height: 2px;
    width: 50px;
}

.my-footer-col ul li:not(:last-child) {
    margin-bottom: 10px;
}

.my-footer-col ul li a {
    font-size: 16px;
    text-transform: capitalize;
    color: #bbbbbb;
    text-decoration: none;
    display: block;
    transition: all 0.3s ease;
}

.my-footer-col ul li a:hover {
    color: #ffffff;
    padding-left: 8px;
}

.my-social-links a {
    display: inline-block;
    height: 40px;
    width: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    margin: 0 10px 10px 0;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    color: #ffffff;
    transition: all 0.5s ease;
}

.my-social-links a:hover {
    color: #24262b;
    background-color: #ffffff;
}

</style>
