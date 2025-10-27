<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import Footer from "@/components/Footer.vue"
// ---- Endpoints ----
const API_URL_CATEGORIAS = "http://127.0.0.1:8000/api/categories/"
const API_URL_TIPOS = "http://127.0.0.1:8000/api/tipos/"
const API_URL_PRODUTOS = "http://127.0.0.1:8000/api/produtos/"
const API_URL_SACOLA = "http://127.0.0.1:8000/api/sacola/"
const API_URL_FAVORITOS = "http://127.0.0.1:8000/api/favoritos/"

// ---- Estado reativo ----
const menuAberto = ref(false)
const opcaoSelecionada = ref(null)
const categorias = ref([])
const produtosAleatoriosTopo = ref([])
const produtosAleatoriosBaixo = ref([])
const colecoesAleatorias = ref([])  // coleções

const showUsuario = ref(false)
const showCompra = ref(false)
const showPesquisa = ref(false)
const search = ref("")
const preview = ref(null)
const defaultImg = "/public/imagem/usuario4.jpg"

const router = useRouter()

// ---- Menu ----
function toggleMenu() {
    menuAberto.value = !menuAberto.value
    opcaoSelecionada.value = null
}

function selecionarOpcao(cat) {
    opcaoSelecionada.value = cat
}

// ---- Navegação ----
function irParaHome() {
    router.push("/")
}
function toggleCompra() {
    router.push("/sacola")
}
function togglePesquisa() {
    router.push("/favorito")
}

// ---- Upload de imagem ----
function onFileChange(event) {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = e => (preview.value = e.target.result)
    reader.readAsDataURL(file)
}

// ---- Pesquisa ----
function doSearch() {
    alert(`Você pesquisou: ${search.value}`)
}

// ---- Buscar categorias e tipos ----
async function fetchCategoriasETipos() {
    try {
        const resCat = await axios.get(API_URL_CATEGORIAS)
        const categoriasData = resCat.data.results || resCat.data

        const resTipos = await axios.get(API_URL_TIPOS)
        const tiposData = resTipos.data.results || resTipos.data

        categorias.value = categoriasData.map(cat => ({
            ...cat,
            tipos: tiposData.filter(tipo => tipo.categoria === cat.id)
        }))
    } catch (error) {
        console.error("❌ Erro ao carregar categorias/tipos:", error)
    }
}

// ---- Produtos aleatórios e coleções ----
async function fetchProdutosAleatorios() {
    try {
        const res = await axios.get(API_URL_PRODUTOS)
        const todosProdutos = res.data.results || res.data

        if (!Array.isArray(todosProdutos) || todosProdutos.length === 0) {
            produtosAleatoriosTopo.value = []
            produtosAleatoriosBaixo.value = []
            colecoesAleatorias.value = []
            return
        }

        // embaralhar e dividir em duas seções
        const shuffled = [...todosProdutos].sort(() => Math.random() - 0.5)
        produtosAleatoriosTopo.value = shuffled.slice(0, 5)
        produtosAleatoriosBaixo.value = shuffled.slice(5, 10)

        // extrair coleções únicas
        const colecoesUnicas = []
        todosProdutos.forEach(p => {
            if (p.colecao && !colecoesUnicas.some(c => c.id === p.colecao.id)) {
                colecoesUnicas.push(p.colecao)
            }
        })
        colecoesAleatorias.value = colecoesUnicas.sort(() => Math.random() - 0.5).slice(0, 5)

        // carregar favoritos
        await carregarFavoritos()
    } catch (err) {
        console.error("Erro ao buscar produtos:", err)
        produtosAleatoriosTopo.value = []
        produtosAleatoriosBaixo.value = []
        colecoesAleatorias.value = []
    }
}

// ---- Sacola ----
async function adicionarSacola(produto) {
    try {
        const token = localStorage.getItem("access_token")
        if (!token) {
            alert("Você precisa estar logado para adicionar à sacola")
            return
        }

        const res = await axios.get(API_URL_SACOLA, {
            headers: { Authorization: `Bearer ${token}` }
        })

        const sacolaAtual = Array.isArray(res.data.results) ? res.data.results : res.data
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
        alert("❌ Erro ao adicionar à sacola.")
    }
}

// ---- Favoritos ----
async function toggleFavorito(produto) {
    try {
        const token = localStorage.getItem("access_token")
        if (!token) {
            alert("Você precisa estar logado para favoritar")
            return
        }

        const res = await axios.get(API_URL_FAVORITOS, {
            headers: { Authorization: `Bearer ${token}` }
        })

        const favoritos = Array.isArray(res.data.results) ? res.data.results : res.data
        const jaFavorito = favoritos.find(f => f.produto?.id === produto.id)

        if (jaFavorito) {
            await axios.delete(`${API_URL_FAVORITOS}${jaFavorito.id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            produto.isFavorito = false
            alert(`${produto.nome} removido dos favoritos`)
        } else {
            await axios.post(
                API_URL_FAVORITOS,
                { produto_id: produto.id },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            produto.isFavorito = true
            alert(`${produto.nome} adicionado aos favoritos`)
        }

        await carregarFavoritos()
    } catch (error) {
        console.error("Erro ao favoritar:", error)
    }
}

// ---- Favorito com índice (reactivo) ----
function toggleFavoritoIndexTopo(index) {
    const produto = produtosAleatoriosTopo.value[index]
    toggleFavorito(produto).then(() => {
        produtosAleatoriosTopo.value[index].isFavorito = !produtosAleatoriosTopo.value[index].isFavorito
    })
}
function toggleFavoritoIndexBaixo(index) {
    const produto = produtosAleatoriosBaixo.value[index]
    toggleFavorito(produto).then(() => {
        produtosAleatoriosBaixo.value[index].isFavorito = !produtosAleatoriosBaixo.value[index].isFavorito
    })
}


// ---- Carregar favoritos ----
async function carregarFavoritos() {
    const token = localStorage.getItem("access_token")
    if (!token) return

    try {
        const res = await axios.get(API_URL_FAVORITOS, {
            headers: { Authorization: `Bearer ${token}` }
        })
        const favoritos = Array.isArray(res.data.results) ? res.data.results : res.data

        // Atualiza produtos topo
        produtosAleatoriosTopo.value = produtosAleatoriosTopo.value.map(p => ({
            ...p,
            isFavorito: favoritos.some(f => f.produto?.id === p.id)
        }))

        // Atualiza produtos baixo
        produtosAleatoriosBaixo.value = produtosAleatoriosBaixo.value.map(p => ({
            ...p,
            isFavorito: favoritos.some(f => f.produto?.id === p.id)
        }))

    } catch (err) {
        console.error("Erro ao buscar favoritos:", err)
    }
}


// ---- Navegar para produto/coleção ----
function goToProduto(produtoId) {
    router.push({ path: "/especificacao", query: { id: produtoId } })
}

function goToColecao(colecaoNome) {
    if (!colecaoNome) return
    router.push({ path: "/colecoes", query: { nome: colecaoNome } })
}

// ---- Inicialização ----
onMounted(async () => {
    await fetchCategoriasETipos()
    await fetchProdutosAleatorios()
})

// ---- topo ----

function voltarAoTopo() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

</script>


<template>
    <div class="inicio">
        <div class="menu-container">
            <!-- Botão do Menu -->
            <div class="menu" @click="toggleMenu">
                <i class="fa-solid fa-bars"></i>
            </div>

            <!-- Modal Lateral do Menu -->
            <div class="overlay" :class="{ show: menuAberto }" @click.self="toggleMenu">
                <div class="side-menu" :class="{ show: menuAberto }">
                    <button @click="toggleMenu"><i class="fa-solid fa-xmark"></i></button>

                    <div class="menu-content">
                        <!-- Coluna de categorias -->
                        <div class="categorias">
                            <h3>Categorias</h3>
                            <ul>
                                <li v-for="cat in categorias" :key="cat.id" @click="selecionarOpcao(cat)">
                                    {{ cat.nome }}
                                </li>
                                <li><router-link to="/home">INÍCIO</router-link></li>
                            </ul>
                        </div>

                        <div class="subcategorias">
                            <transition name="fade-slide" mode="out-in">
                                <div v-if="opcaoSelecionada" :key="opcaoSelecionada.id">
                                    <h4>{{ opcaoSelecionada.nome }}</h4>
                                    <ul>
                                        <li v-for="tipo in opcaoSelecionada.tipos" :key="tipo.id">
                                            <router-link :to="'/cards?tipo=' + tipo.id">{{ tipo.nome }}</router-link>
                                        </li>
                                    </ul>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>

            <div class="nome-logo">
                <!-- mantive o caminho que você usa -->
                <img src="/public/imagem/logo.png" alt="">
            </div>

            <div class="icons-menu">
                <i class="fa-solid fa-heart" @click="togglePesquisa"></i>
                <i class="fa-solid fa-user" @click="irParaHome"></i>
                <i class="fa-solid fa-bag-shopping" @click="toggleCompra"></i>
            </div>
        </div>

        <!-- Banner principal (mantive o seu arquivo original) -->
        <div class="imagem-principal">
            <img src="/public/imagem/imagem-principal.png" alt="">
        </div>
    </div>
    <!-- ===== SEÇÃO DE PRODUTOS ALEATÓRIOS ===== -->
    <section class="produtos-home">
        <h1>Aqui é Tendência!</h1>
        <div class="card-container">
            <div class="card" v-for="(produto, index) in produtosAleatoriosTopo" :key="produto.id">
                <!-- Coleção + Favorito -->
                <div class="colecao">
                    <h2><router-link :to="`/colecao/${produto.colecao.id}`" @click.stop>
                            {{ produto.colecao.nome }}
                        </router-link>
                    </h2>

                    <img :src="produto.isFavorito ? '/heart-full.png' : '/heart-empty.png'" class="icon-favorito"
                        @click.stop="toggleFavoritoIndexTopo(index)" />
                </div>

                <!-- Imagem do Produto -->
                <div class="imagem-card" @click="goToProduto(produto.id)">
                    <img :src="produto.imagem_produto || produto.colecao?.imagem_mostruario || '/fallback.png'"
                        alt="Normal" class="normal" />
                    <img :src="produto.imagem_amostra || produto.colecao?.imagem_mostruario || produto.imagem_produto || '/fallback.png'"
                        alt="Hover" class="hover" />
                </div>

                <!-- Nome e descrição -->
                <div class="titulo-card">{{ produto.nome }}</div>
                <div class="descricao-card">{{ produto.descricao_colecao || produto.colecao?.descricao || "" }}</div>

                <!-- Preço -->
                <div class="valor-card">
                    <div class="escrita-valor">R$</div>
                    <div class="numero-valor">
                        {{ produto.preco?.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2, maximumFractionDigits: 2
                        }) || "0,00" }}
                    </div>
                </div>

                <!-- Botão adicionar à sacola -->
                <div class="botao-card">
                    <button @click.stop="adicionarSacola(produto)">Adicionar à sacola</button>
                </div>
            </div>
        </div>
    </section>


    <div class="anuncio1">
        <h1>Nossas Coleções</h1>
        <p>Cada uma de nossas coleções nasce com uma personalidade própria — como se tivesse alma. São criadas a partir
            de diferentes gostos, estilos e inspirações, unindo tendências atuais ao toque autêntico de quem não tem
            medo de se expressar. Aqui, cada detalhe conta uma história, e cada peça traduz uma forma única de ser.</p>
        <button class="botao-anuncio1">Conhecer</button>
    </div>

    <div class="anuncios-container">
        <div class="anuncio2"></div>
        <div class="anuncio3"></div>
        <div class="anuncio4"></div>
    </div>

    <!-- ======= coleções aleatórias (área de baixo) ======= -->
    <div class="filtragem">
        <h1>Ache sua coleção ideal</h1>
        <div class="filtros">
            <div class="filtro" v-for="colecao in colecoesAleatorias" :key="colecao.id">
                <router-link :to="`/colecao/${colecao.id}`">{{ colecao.nome }}</router-link>
            </div>

        </div>
    </div>
    <section class="produtos-home">
        <div class="card-container">
            <div class="card" v-for="(produto, index) in produtosAleatoriosBaixo" :key="produto.id">
                <!-- Coleção + Favorito -->
                <div class="colecao">
                    <h2><router-link :to="`/colecao/${produto.colecao.id}`" @click.stop>
                            {{ produto.colecao.nome }}
                        </router-link>
                    </h2>

                    <img :src="produto.isFavorito ? '/heart-full.png' : '/heart-empty.png'" class="icon-favorito"
                        @click.stop="toggleFavoritoIndexBaixo(index)" />
                </div>

                <!-- Imagem do Produto -->
                <div class="imagem-card" @click="goToProduto(produto.id)">
                    <img :src="produto.imagem_produto || produto.colecao?.imagem_mostruario || '/fallback.png'"
                        alt="Normal" class="normal" />
                    <img :src="produto.imagem_amostra || produto.colecao?.imagem_mostruario || produto.imagem_produto || '/fallback.png'"
                        alt="Hover" class="hover" />
                </div>

                <!-- Nome e descrição -->
                <div class="titulo-card">{{ produto.nome }}</div>
                <div class="descricao-card">{{ produto.descricao_colecao || produto.colecao?.descricao || "" }}</div>

                <!-- Preço -->
                <div class="valor-card">
                    <div class="escrita-valor">R$</div>
                    <div class="numero-valor">
                        {{ produto.preco?.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2, maximumFractionDigits: 2
                        }) || "0,00" }}
                    </div>
                </div>

                <!-- Botão adicionar à sacola -->
                <div class="botao-card">
                    <button @click.stop="adicionarSacola(produto)">Adicionar à sacola</button>
                </div>
            </div>
        </div>
    </section>
<div class="marquee">
  <span>💥FRETE GRÁTIS — NOVAS COLEÇÕES DISPONÍVEIS — FAZEMOS PIX 💥</span>
  
</div>
<section class="beneficios">
  <div>
    <i class="fa-solid fa-truck-fast"></i>
    <h4>Entrega Rápida</h4>
    <p>Envios para todo o Brasil</p>
  </div>
  <div>
    <i class="fa-solid fa-leaf"></i>
    <h4>Eco Friendly</h4>
    <p>Produtos sustentáveis</p>
  </div>
  <div>
    <i class="fa-solid fa-credit-card"></i>
    <h4>Pagamentos Seguros</h4>
    <p>Via cartão, Pix e boleto</p>
  </div>
</section>

<button class="voltar-topo" @click="voltarAoTopo">↑</button>

    <Footer/>    

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
        integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</template>

<style scoped>
.voltar-topo {
  position: fixed;
  bottom: 25px;
  right: 25px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.3s;
  opacity: 0.8;
  z-index: 9999;
}

.voltar-topo:hover {
  opacity: 1;
  background: #161616;
}

.beneficios {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin: 80px 0;
  font-family: 'Poppins', sans-serif;
  text-align: center;
}
.beneficios div {
  width: 180px;
}
.beneficios i {
  font-size: 2rem;
  color: #84827e;
  margin-bottom: 10px;
}
.beneficios h4 {
  font-weight: 600;
  margin-bottom: 6px;
}


.marquee {
  background-color: #000;
  color: #fff;
  margin-top: 40px;
  padding: 10px 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
}
.marquee span {
  display: inline-block;
  animation: scrollText 10s linear infinite;
}
@keyframes scrollText {
  from { transform: translateX(300%); }
  to { transform: translateX(-100%); }
}






.produtos-home h1{
    text-align: center;
    font-size: 2rem;
}

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

.colecao a{
        text-decoration: none;
color: #000;
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


.imagem-principal img {
    width: 100%;
    border-radius: 30px;
    height: 95%;
    margin-top: 10px;
}


/* Lateral Menu */

.menu-content {
    display: flex;
    gap: 30px;
    height: 100%;
}

.categorias {
    width: 40%;
    border-right: 2px solid #d2d0cc;
    margin-left: 50px;
}

.subcategorias {
    width: 60%;
    padding-left: 20px;
    margin-top: 100px;
}

.side-menu {
    background-color: #fff;
    width: 50%;
    border-top-left-radius: 20px;
    height: 100%;
    padding: 20px;
    box-shadow: -4px 0 8px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    transform: translateX(100%);
    /* começa fora da tela */
    transition: transform 0.3s ease;
}

.side-menu.show {
    transform: translateX(0);
    /* desliza para dentro */
}



.side-menu h3 {
    font-family: 'Poppins', sans-serif;
    margin-bottom: 15px;
    font-size: 2rem;
    color: #84827e;
}

.side-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.side-menu li {
    padding: 10px 0;
    font-size: 1.2rem;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    text-decoration: none;
}

.subcategorias a {
    text-decoration: none;
    color: inherit;
    /* usa a mesma cor do texto normal */
    font-family: 'Poppins', sans-serif;
    padding: 10px 0;
}

.categorias a {
    text-decoration: none;
    color: #333;
    cursor: default;
    font-weight: 500;
    transition: color 0.3s ease;
}

.categorias a:hover {
    color: #a1a3a4;
    font-weight: bold;
    transition: ease 0.5s;

}

.side-menu li:hover {
    color: #a1a3a4;
    font-weight: bold;
    transition: ease 0.5s;
}

/* Submenu dentro do menu lateral */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.fade-slide-enter-to {
    opacity: 1;
    transform: translateX(0);
}

.fade-slide-leave-from {
    opacity: 1;
    transform: translateX(0);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}


.submenu-lateral {
    margin-top: 15px;
    padding-left: 15px;
    border-left: 2px solid #feb7d9;
}


/*pesquisa*/
.search-container {
    align-items: center;
    gap: 8px;
    margin: 20px auto;
    width: 90vh;
    margin-left: 40px;
}

.overlay h2 {
    color: #84827e;
    font-size: 1.5rem;
    font-family: 'Poppins', sans-serif;
    margin-left: 60px;
}


.search-input {
    padding: 10px 14px;
    height: 30px;
    width: 100%;
    margin-top: 40px;
    font-size: 1.2rem;
    border-radius: 20px;
    border: none;
    /* tira a borda padrão */
    background-color: #F0F0F3;
    /* cor clara de fundo */
    box-shadow:
        inset 3px 3px 6px #cfceced0,
        /* sombra interna mais escura */
        inset -3px -3px 6px #ffffff;
    /* sombra interna mais clara */

    outline: none;
    transition: all 0.3s ease;
}




.search-btn:hover {
    background: #84827e;
}

/*Usuario*/



.perfil-container input {
    font-family: 'Poppins', sans-serif;
    margin-left: 500px;
    margin-top: -90px;
    color: #84827e;
}

.perfil-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.perfil-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: 20px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, .40);
    z-index: 2;
}

/*CARRINHO*/



.linhas {
    display: grid;
    grid-template-columns: 150px 150px 150px;
    margin-left: 130px;
    gap: 2px;
}

.linha1 {
    border-color: #84827e;
    background-color: transparent;
    height: 5px;
    background-color: #84827e;
    box-shadow: 0 4px 20px rgba(0, 0, 0, .40);

}

.linha2,
.linha3 {
    height: 5px;
    border-color: #84827e;
    background-color: transparent;
    box-shadow: 0 6px 20px rgba(0, 0, 0, .40);

}

.linha4 {
    width: 100%;
    margin-top: 50px;
    border-bottom: .0625rem dotted #dddedc;
}

.linha5 {
    width: 100%;
    margin-top: 50px;
    border-bottom: .0625rem dotted #dddedc;
}

/*ve*/

.overlay button {
    text-decoration: none;
    border: none;
    background-color: transparent;
    font-size: 2rem;
    margin-left: 89vh;
}

.overlay button:hover {
    color: #84827e;
    transition: ease .5s;
}

.imagem-principal {
    background-image: url(/public/imagem/principal.png);
    width: 100%;
    height: 100%;
    margin-left: 50px;
    margin-right: 50px;
    border-radius: 20px;
    background-size: cover;
    /* cobre todo o espaço, pode cortar */
    background-position: center;
    /* centraliza a imagem */
    background-repeat: no-repeat;
}


/* Fundo escuro/fosco */
/* Fundo escuro/fosco */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    /* transparente por padrão */
    display: flex;
    justify-content: flex-end;
    z-index: 999;
    pointer-events: none;
    /* evita clicar quando oculto */
    transition: background-color 0.3s ease;
}

.overlay.show {
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: auto;
    /* ativa cliques quando visível */
}

/* Modal lateral */
.side-modal {
    background-color: #fff;
    width: 50%;
    border-top-left-radius: 20px;
    height: 100%;
    padding: 20px;
    box-shadow: -4px 0 8px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    transform: translateX(100%);
    /* começa fora da tela */
    transition: transform 0.3s ease;
}

.side-modal.show {
    transform: translateX(0);
    /* desliza para dentro */
}



/*FILTRAGEM*/

.filtragem {
    font-family: 'Poppins', sans-serif;
    margin-top: 60px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
}

.filtragem h1{
    font-size: 2rem;
}

.filtragem a{
    color: #000;
    text-decoration: none;
}

.filtragem a:hover{
    color: #fff;
    
}

.filtros {
    display: flex;
    margin-top: 40px;
    gap: 40px;
    margin-left: 250px;

}

.filtro {
    box-shadow: 0 6px 20px rgba(0, 0, 0, .40);
    border-radius: 40px;
    width: 170px;
    height: 40px;
    display: flex;
    justify-content: center;
    /* Centraliza horizontalmente */
    align-items: center;
        transition: ease .5s;

}

.filtro:hover {
    background-color: #000000;
}

.filtro i {
    margin-right: 10px;
    margin-top: -5px;
}

/*ANUNCIO */

.anuncio1 {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    width: 190vh;
    height: 250px;
    background-color: #000;
    margin-left: 90px;
    margin-top: 40px;
    border-radius: 20px;
    border-top: 1px solid transparent;
    /* já evita colapso */

}

.anuncio1 p {
    color: #ffffff;
    margin-top: 20px;
    width: 150vh;
    margin-left: 130px;
}

.anuncio1 h1 {
    color: #ffffff;
    margin-top: 15px;
    font-size: 2.5rem;
}

.botao-anuncio1 {
    text-decoration: none;
    margin-top: 10px;
    width: 300px;
    height: 40px;
    border: none;
    border-radius: 40px;
    font-weight: 600;
    font-size: 1rem;
}

.botao-anuncio1:hover {
    background-color: #9c9d9d;
    transition: ease .5s;
    color: #ffffff;
}

.anuncios-container {
    display: grid;
    grid-template-areas:
        'anuncio2  anuncio3'
        'anuncio2  anuncio4';
    gap: 20px;
    margin-top: 70px;
    margin-right: 90px;

}

.anuncio2 {
    grid-area: anuncio2;
    background-image: url(/public/imagem/cabelo-ensaboando.jpg);
    height: 620px;
    border-radius: 30px;
    width: 500px;
    margin-left: 120px;
    background-size: cover;
    /* cobre todo o espaço, pode cortar */
    background-position: center;
    /* centraliza a imagem */
    background-repeat: no-repeat;
}



.anuncio3 {
    grid-area: anuncio3;
    background-image: url(/public/imagem/anuncio3.png);
    background-size: cover;
    /* cobre todo o espaço, pode cortar */
    background-position: center;
    /* centraliza a imagem */
    background-repeat: no-repeat;
    border-radius: 30px;
    height: 300px;
    width: 700px;
}

.anuncio4 {
    grid-area: anuncio4;
    background-image: url(/public/imagem/anuncio4.png);
    background-size: cover;
    /* cobre todo o espaço, pode cortar */
    background-position: center;
    /* centraliza a imagem */
    background-repeat: no-repeat;
    border-radius: 30px;
    height: 300px;
    width: 700px;
}

/*CAR

/*CARDS*/

/*MENU*/

/*MENU*/
.menu-container {
    position: fixed;
    top: 0;
    width: 99%;
    border-radius: 20px;
    max-width: 1535px;
    margin-top: 10px;
    height: 70px;
    display: flex;
    align-items: center;
    background-color: #000000;
    z-index: 999;
}

.menu {
    margin-left: 20px;
    display: flex;
    align-items: center;
}

.menu-container>.menu:first-child {
    margin-left: 40px;
}

.menu-container i:last-child {
    margin-right: 60px;
}

.menu-container i {
    font-size: 1.5rem;
    color: #000;
    margin: 0 10px;
}

.menu-container i:hover {
    color: #858687;
    transition: ease .5s;
}

.menu-container h2 {
    font-family: "Playfair Display", serif;
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
}

.nome-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    text-align: center;
}

.nome-logo img {
    width: 140px;
    height: 80px;
}

/* INÍCIO */

.icons-menu {
    display: grid;
    grid-template-columns: 50px 50px 50px;
    margin-right: 40px;
}

.icons-menu i {
    color: #ffffff;
}

.icons-menu i:hover {
    color: #585656ad;
    transition: ease .5s;
}

.menu i {
    color: #ffffff;
}

.menu i:hover {
    color: #716f6fad;
    transition: ease .5s;
}

.inicio {
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}


.inicio h1 {
    font-family: "Playfair Display", serif;
    font-weight: 700;
    font-size: 12rem;
    position: relative;
    top: 40px;
    animation: primeiranimation 1s ease 0.3s forwards;
    z-index: -1;
}

@keyframes primeiranimation {
    0% {
        transform: scale(1);
    }

    100% {
        color: #feb7d9;
        opacity: 0.4;
        transition: ease 1s;
    }
}

/* Dropdown Menu */
.dropdown-menu {
    position: absolute;
    top: 70px;
    width: 400px;
    left: 0;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 10px 0;
    padding: 10px 20px;
    z-index: 1000;
}

.dropdown-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.dropdown-menu li {
    padding: 8px 0;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
}

.dropdown-menu li:hover {
    color: #feb7d9;
    font-weight: bold;
}

.dropdown-menu li.selecionado {
    background-color: #feb7d95f;
    color: #ffffff;
    font-weight: bold;
    transition: background-color 0.5s ease, color 0.5s ease;
    border-radius: 5px;
}

/* Submenu */
.submenu {
    position: absolute;
    top: 0;
    left: 100%;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 0 10px 10px 10px;
    padding: 10px 20px;
    min-width: 200px;
    z-index: 1001;
}

.submenu ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.submenu li {
    padding: 8px 0;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
}

.submenu li:hover {
    color: #feb7d9;
    font-weight: bold;
}
</style>