<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Menu from '@/components/Menu.vue'
import CardsAleatorios from "@/components/CardsAleatorios.vue"
import Footer from '@/components/Footer.vue'
import LoadingPreloader from '@/components/LoadingPreloader.vue'
  // preloader inicio

const loadingPreloaderAtivo = ref(true)
const produtosHome = ref([])

async function carregarProdutosHome() {
  loadingPreloaderAtivo.value = true
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/produtos/')
    produtosHome.value = res.data.results || res.data
  } catch (e) {
    console.error(e)
  } finally {
    loadingPreloaderAtivo.value = false
  }
}


onMounted(() => {
  // Mantém o preloader por 5 segundos (5000ms)
  setTimeout(() => {
    loadingPreloaderAtivo.value = false;
  }, 5000);
});

  // preloader fim


const route = useRoute();

const produto = ref<any>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const isFavorito = ref(false);
// @ts-ignore
const API_BASE: string = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

// Buscar o produto pelo ID
async function fetchProduto() {
  loading.value = true;
  try {
    const id = route.query.id as string;
    if (!id) throw new Error("ID do produto não fornecido");
    const res = await axios.get(`${API_BASE}/produtos/${id}/`);
    produto.value = res.data;

    await carregarFavorito();
  } catch (err: any) {
    console.error(err);
    error.value = "Erro ao carregar o produto";
  } finally {
    loading.value = false;
  }
}

// Carregar status do favorito do produto
async function carregarFavorito() {
  const token = localStorage.getItem('access_token');
  if (!token) return;

  try {
    const res = await axios.get(`${API_BASE}/favoritos/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const favoritos = Array.isArray(res.data.results) ? res.data.results : res.data;
    isFavorito.value = favoritos.some(f => f.produto?.id === produto.value.id);
  } catch (err) {
    console.error("Erro ao buscar favoritos:", err);
  }
}

//Favoritar / desfavoritar
async function toggleFavorito() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    alert('Você precisa estar logado para adicionar aos favoritos');
    return;
  }

  try {
    const res = await axios.get(`${API_BASE}/favoritos/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const favoritos = Array.isArray(res.data.results) ? res.data.results : res.data;
    const jaFavoritado = favoritos.find(f => f.produto?.id === produto.value.id);

    if (jaFavoritado) {
      await axios.delete(`${API_BASE}/favoritos/${jaFavoritado.id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      isFavorito.value = false;
      alert(`${produto.value.nome} removido dos favoritos`);
    } else {
      await axios.post(`${API_BASE}/favoritos/`,
        { produto_id: produto.value.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      isFavorito.value = true;
      alert(`${produto.value.nome} adicionado aos favoritos`);
    }

  } catch (err) {
    console.error("Erro ao gerenciar favorito:", err);
    alert("❌ Não foi possível atualizar o favorito.");
  }
}

// Função de adicionar à sacola (igual página dos cards)
async function addToCart(produto: any) {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Você precisa estar logado para adicionar à sacola');
      return;
    }

    const res = await axios.get(`${API_BASE}/sacola/`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const sacolaBackend = Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data.results)
        ? res.data.results
        : [];

    const itemExistente = sacolaBackend.find(item => item.produto?.id === produto.id);

    if (itemExistente) {
      await axios.patch(
        `${API_BASE}/sacola/${itemExistente.id}/`,
        { quantidade: itemExistente.quantidade + 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`${produto.nome} atualizado na sacola!`);
    } else {
      await axios.post(
        `${API_BASE}/sacola/`,
        { produto_id: produto.id, quantidade: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`${produto.nome} adicionado à sacola!`);
    }
  } catch (err) {
    console.error("Erro ao adicionar à sacola:", err.response?.data || err);
    alert("❌ Não foi possível adicionar o produto à sacola.");
  }
}

// Controle dos accordions
const activeSection = ref<string | null>(null);
const toggleSection = (section: string) => {
  activeSection.value = activeSection.value === section ? null : section;
};

onMounted(fetchProduto);
</script>

<template>
      <!-- preloader inicio -->

  <LoadingPreloader :ativoPreloader="loadingPreloaderAtivo">
    <template #extra>
    </template>
  </LoadingPreloader>

        <!-- preloader fim -->

  <Menu />

  <div v-if="loading" class="carregando">Carregando produto...</div>
  <div v-else-if="error" class="erro">{{ error }}</div>

  <div v-else class="container">
      <!-- IMAGEM PRINCIPAL -->
      <div class="imagens-container">
        <img :src="produto.imagem_produto || produto.imagem_amostra || '/fallback.png'" alt="imagem do produto" />
      </div>

      <!-- BLOCO DE ESPECIFICAÇÕES -->
      <div class="expecificacoes-container">
        <div class="icone-favorito" @click="toggleFavorito">
          <img :src="isFavorito ? '/heart-full.png' : '/heart-empty.png'" alt="favorito" class="heart-icon" />
        </div>

        <div class="expecificacao">{{ produto.nome || 'Nome do produto' }}</div>
        <div class="expecificacao-menor">{{ produto.category?.nome || produto.category || 'Categoria' }}</div>
        <div class="detalhes">{{ produto.descricao || produto.colecao?.descricao || 'Descrição do produto.' }}</div>

        <div class="valor">
          <span class="escrita-valor">R$</span>
          <span class="numero-valor">
            {{ Number(produto.preco || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
          </span>
        </div>

        <div class="botao-compra">
          <button @click="addToCart(produto)">Adicionar à sacola</button>
        </div>
        <!-- ACCORDION -->
         <!-- Aplicação -->
      <div class="accordion">
        <div class="accordion-header" @click="toggleSection('aplicacao')">
          Aplicação
        </div>
        <div class="accordion-content" :class="{ open: activeSection === 'aplicacao' }">
          <p>
            Aplique nos cabelos úmidos, massageando suavemente da raiz às
            pontas. Enxágue bem.
          </p>
        </div>
      </div>

      <!-- Ingredientes -->
      <div class="accordion">
        <div class="accordion-header" @click="toggleSection('ingredientes')">
          Ingredientes
        </div>
        <div class="accordion-content" :class="{ open: activeSection === 'ingredientes' }">
          <p>
            Água, Óleo de Argan, Queratina Hidrolisada, Extrato de Aloe Vera,
            Vitaminas A e E.
          </p>
        </div>
      </div>

      <!-- Benefícios -->
      <div class="accordion">
        <div class="accordion-header" @click="toggleSection('beneficios')">
          Benefícios
        </div>
        <div class="accordion-content" :class="{ open: activeSection === 'beneficios' }">
          <p>
            • Hidratação intensa <br>
            • Redução do frizz <br>
            • Brilho e maciez imediatos
          </p>
        </div>
      </div>
      </div>
    <!-- BANNER -->
    <div class="banner">
      <img :src="produto.colecao?.imagem_mostruario || produto.imagem_amostra || '/fallback.png'"
        alt="banner da coleção" />
    </div>
  </div>
<div class="conteudo">
  <div class="conteudo1">
    <div class="icone-conteudo"><i class="fa-solid fa-seedling"></i></div>
    <div class="sub-conteudo">Vegano</div>
    <div class="txt-conteudo">Produto livre de ingredientes de origem animal</div>
  </div>
  <div class="conteudo2">
    <div class="icone-conteudo"><i class="fa-solid fa-shield-alt"></i></div>
    <div class="sub-conteudo">Seguro</div>
    <div class="txt-conteudo">Testado dermatologicamente para sua pele</div>
  </div>
  <div class="conteudo3">
    <div class="icone-conteudo"><i class="fa-solid fa-recycle"></i></div>
    <div class="sub-conteudo">Sustentável</div>
    <div class="txt-conteudo">Embalagem 100% reciclável e consciente</div>
  </div>
</div>

<!-- Benefícios extras -->
<div class="beneficios-section">
  <h2>Benefícios do Produto</h2>
  <div class="beneficios-cards">
    <div class="beneficio-card">
      <i class="fa-solid fa-droplet"></i>
      <h3>Hidratação Intensa</h3>
      <p>Deixa a pele macia e profundamente hidratada por 24h.</p>
    </div>
    <div class="beneficio-card">
      <i class="fa-solid fa-sun"></i>
      <h3>Proteção Diária</h3>
      <p>Com ativos naturais que protegem contra agentes externos.</p>
    </div>
    <div class="beneficio-card">
      <i class="fa-solid fa-heart"></i>
      <h3>Dermatologicamente Testado</h3>
      <p>Ideal para todos os tipos de pele, inclusive as sensíveis.</p>
    </div>
  </div>
</div>

<!-- Informações técnicas -->
<div class="tabela-info">
  <h2>Informações Técnicas</h2>
  <table>
    <tr><th>Tipo</th><td>Cosmético</td></tr>
    <tr><th>Volume</th><td>200 ml</td></tr>
    <tr><th>Validade</th><td>24 meses</td></tr>
    <tr><th>Cruelty-Free</th><td>Sim</td></tr>
  </table>
</div>


   <div class="pagina-outra">
    <h1>Você também pode gostar...</h1>
    <CardsAleatorios />
  </div>

    <Footer/>

</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');

.beneficios-section {
  text-align: center;
  margin: 80px 0;
}

.beneficios-section h2 {
  font-size: 2rem;
  margin-bottom: 30px;
  color: #333;
}

.beneficios-cards {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.beneficio-card {
  background: #f5f5f5;
  border-radius: 20px;
  width: 250px;
  padding: 25px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.beneficio-card:hover {
  transform: translateY(-10px);
  background: #e9e9e9;
}

.beneficio-card i {
  font-size: 2rem;
  color: #84827e;
  margin-bottom: 10px;
}

.beneficio-card h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #222;
}

.beneficio-card p {
  font-size: 0.95rem;
  color: #555;
}

/* tabela */
.tabela-info {
  margin: 60px auto;
  width: 80%;
  max-width: 700px;
  background: #fff;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.tabela-info h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.tabela-info table {
  width: 100%;
  border-collapse: collapse;
}

.tabela-info th, .tabela-info td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.tabela-info th {
  color: #555;
  font-weight: 600;
  width: 40%;
}

.tabela-info td {
  color: #333;
}

/* conteudo */
.conteudo {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 80px;
  text-align: center;
}

.conteudo1, .conteudo2, .conteudo3 {
  background-color: #000;
  color: #fff;
  padding: 30px 20px;
  border-radius: 20px;
  width: 250px;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.conteudo1:hover, .conteudo2:hover, .conteudo3:hover {
  transform: translateY(-10px);
  background-color: #222;
}

.icone-conteudo {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #ffffff;
}

.sub-conteudo {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.txt-conteudo {
  font-size: 1rem;
  line-height: 1.4;
}


.sub-container {
  display: flex;
}

.pagina-outra{
  text-align: center;
}

.pagina-outra h1{
  justify-content: center; /* alinha no eixo horizontal */
  align-items: center; 
}

.heart-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-top: 30px;
  margin-right: 20px;
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

.categorias a:hover {
  color: #333;
  /* mantém a cor ao passar o mouse */
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


/*MENU*/
.menu-container {
  position: fixed;
  top: 0;
  width: 92%;
  border-radius: 20px;
  max-width: 1535px;
  margin-top: 10px;
  height: 70px;
  display: flex;
  align-items: center;
  background-color: #dee2e5;
  z-index: 999;
  box-shadow: 2px 2px 5px #a3b1c6, -2px -2px 5px #ffffff;
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
  color: #000000ad;
  transition: ease .5s;
}

.menu i {
  color: #ffffff;
}

.menu i:hover {
  color: #000000ad;
  transition: ease .5s;
}

.inicio {
  position: relative;
  height: 100px;
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










* {
  font-family: "Poppins", sans-serif;

}

.linha {
  width: 50vh;
  height: 1px;
  background-color: #333;
  position: relative;
  z-index: 1;
}

.texto p {
  margin-top: 2px;
}

.cores-container {
  grid-area: cores-container;
  background-color: #f1f0ed;
  border-radius: 20px;
  height: 470px;
  display: flex;
  /* espaço entre imagem e texto */
  overflow: hidden;
}

/* imagem centralizada */
.imagem-passo {
  width: 350px;
  height: 350px;
  margin-left: 35vh;
  margin-top: 5px;
}


.texto {
  margin-top: -40vh;
  margin-left: 50px;
  z-index: 1;
}

/* círculos grudados abaixo da imagem */
.circulos {
  display: flex;
  gap: 20px;
  margin-left: 8px;
  margin-top: 25vh;
}

/* só o h1 vira círculo */
.circle h1 {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #bbb;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 1.4rem;
  font-weight: bold;
  transition: 0.3s;
  cursor: pointer;
}

.circle h2 {
  font-size: 0.9rem;
  text-align: center;
  color: #333;
}

.circle.ativo h1,
.circle h1:hover {
  background: #333;
  color: #fff;
  transform: scale(1.1);
}


/* animação suave */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}




.detalhes {
  margin-top: 20px;
  color: rgb(61, 56, 56);
}

.expecificacao-menor {
  font-size: 1rem;
  font-weight: 700;
  color: rgb(61, 56, 56);
}

.expecificacao {
  font-size: 2rem;
  font-weight: 500;
}

.estrelas {
  margin-top: 30px;
  font-size: 1.3rem;
  margin-left: 70vh;
}

.botao-compra {
  text-align: center;
  margin-top: 30px;
}

.botao-compra button {
  text-decoration: none;
  width: 80vh;
  height: 60px;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 40px;
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
 color: white;
  background: #84827e;

}

.botao-compra button:hover {
  color: #fff;
  background-color: #bbb;
  border: none;
  transition: ease 1s;
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.2);
}

.icones {
  display: flex;
  gap: 5px;
  font-size: 2rem;
  margin-left: 85vh;
  color: rgb(61, 56, 56);

}

.icones i:hover {
  color: #bbb;
  transition: ease .5s;
}

/* LAYOUT */



.container {
  display: grid;
  grid-template-areas:
    'imagens-container expecificacoes-container'
    'banner banner';
  gap: 30px;
  margin-left: 40px;
  margin-top: 100px;
  margin-right: 40px;
}

.imagens-container img {
  grid-area: imagens-container;  
  width:90vh;
    box-shadow: -4px 0 8px rgba(0, 0, 0, 0.2);
  height: 80vh;
  margin-left: -35px;
  border-radius: 20px;
    border-radius: 20px;
}

/* EXPECIFICAÇÕES — bloco único (sem duplicar) */
.expecificacoes-container {
  grid-area: expecificacoes-container;
    box-shadow: -4px 0 8px rgba(0, 0, 0, 0.2);

  width:108vh;
  margin-left: -20px;
  height: 80vh;
  /* altura fixa */
  border-radius: 20px;
  padding: 20px;
  overflow-y: auto;
  /* rolagem interna no container */
}

/* ACCORDION */
.accordion {
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding-bottom: 10px;
  margin-top: 40px;
}

.accordion-header {
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
  user-select: none;
}

.accordion-header:hover {
  transition: ease .5s;
}

/* animação de expandir/retrair dentro do limite */
.accordion-content {
  overflow: hidden;
  /* esconde durante a animação */
  max-height: 0;
  /* fechado */
  transition: max-height 0.35s ease;
  padding: 0 10px;
  /* mantém padding horizontal fechado */
}

/* quando abrir, define um teto de expansão e ativa scroll interno se passar */
.accordion-content.open {
  max-height: 200px;
  /* limite visual da seção */
  padding: 10px;
  /* padding completo quando aberto */
  overflow-y: auto;
  /* rolagem só dentro da seção se o texto passar de 200px */
}


.imagem-container {
  grid-area: imagem-container;
  border-radius: 20px;
  background-image: url(../public/imagem/hidratação-pose.jpg);
  background-size: cover;
  /* cobre toda a div */
  background-position: center;
  /* centraliza a imagem */
  background-repeat: no-repeat;
  /* não repete */
  width: 100%;
  height: 100%;
}

.banner {
  grid-area: banner;
  border-radius: 20px;
  overflow: hidden;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -35px;
}

.banner img {
  width: 100%;
  border-radius: 20px;
}

/* layout completo original */

.expecificacoes-container {
  text-align: left;
  position: relative;
}

.icone-favorito {
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 1.5rem;
  cursor: pointer;
}

.expecificacao {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.expecificacao-menor {
  font-size: 1rem;
  color: gray;
  margin-bottom: 15px;
}

.detalhes {
  font-size: 1rem;
  margin-bottom: 15px;
  line-height: 1.5;
}

.valor {
  display: flex;
  align-items: baseline;
  margin-top: 10px;
  margin-bottom: 20px;
}

.escrita-valor {
  font-size: 1rem;
  margin-right: 4px;
}

.numero-valor {
  font-size: 2rem;
  font-weight: 600;
}

.botao-compra {
  display: flex;
  justify-content: center;
}


.accordion {
  margin-top: 30px;
}

.accordion-item {
  border-top: 1px solid #ccc;
  padding: 15px 0;
  cursor: pointer;
}

.accordion-title {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
}

.accordion-content {
  margin-top: 10px;
  font-size: 0.95rem;
  color: #444;
}


.carregando,
.erro {
  font-family: "Poppins", sans-serif;
  text-align: center;
  font-size: 1.3rem;
  margin-top: 80px;
}
</style>
