<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

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

// ❤️ Carregar status do favorito do produto
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

// ❤️ Favoritar / desfavoritar
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
      <div class="accordion">
        <div class="accordion-item" @click="toggleSection('composicao')">
          <div class="accordion-title">
            <span>Composição</span>
            <i :class="activeSection === 'composicao' ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
          </div>
          <div class="accordion-content" v-if="activeSection === 'composicao'">
            <p>{{ produto.composicao || 'Informações de composição não disponíveis.' }}</p>
          </div>
        </div>

        <div class="accordion-item" @click="toggleSection('modo')">
          <div class="accordion-title">
            <span>Modo de Uso</span>
            <i :class="activeSection === 'modo' ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
          </div>
          <div class="accordion-content" v-if="activeSection === 'modo'">
            <p>{{ produto.modo_uso || 'Modo de uso não informado.' }}</p>
          </div>
        </div>

        <div class="accordion-item" @click="toggleSection('indicacao')">
          <div class="accordion-title">
            <span>Indicação</span>
            <i :class="activeSection === 'indicacao' ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
          </div>
          <div class="accordion-content" v-if="activeSection === 'indicacao'">
            <p>{{ produto.indicacao || 'Indicação não informada.' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- BANNER -->
    <div class="banner">
      <img :src="produto.colecao?.imagem_mostruario || produto.imagem_amostra || '/fallback.png'"
        alt="banner da coleção" />
    </div>
  </div>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');

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


/*footer*/

.my-footer {
  background-color: #343535;
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
  background-color: #feb7d9;
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

/* Responsivo */
@media(max-width: 767px) {
  .my-footer-col {
    width: 50%;
    margin-bottom: 30px;
  }
}

@media(max-width: 574px) {
  .my-footer-col {
    width: 100%;
  }
}

/*footer*/



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


.banner {
  grid-area: banner;
  background-color: black;
  border-radius: 20px;
  overflow: hidden;
  height: 400px;
  /* altura que você definir para o banner */
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* faz a imagem se ajustar sem cortar */
  display: block;
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
  width: 70vh;
  height: 60px;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 40px;
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.2);
  border: none;
  color: rgb(61, 56, 56);
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
    'cores-container imagem-container'
    'banner banner';
  gap: 30px;
  margin-left: 40px;
  margin-right: 40px;
}

.imagens-container {
  grid-area: imagens-container;
  background-color: #f1f0ed;
  height: 80vh;
  border-radius: 20px;
  width: 80vh;
  margin-left: 20px;
}


.imagens-container img {
  margin-left: 40px;
}

/* EXPECIFICAÇÕES — bloco único (sem duplicar) */
.expecificacoes-container {
  grid-area: expecificacoes-container;
  background-color: #f1f0ed;
  width: 100vh;
  height: 74vh;
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
  background: #ddd;
  border-radius: 8px;
  user-select: none;
}

.accordion-header:hover {
  background: #bbb;
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
  background-color: black;
  border-radius: 20px;
  overflow: hidden;
}

.banner img {
  width: 100%;
  height: auto;
  display: block;
}

/* layout completo original */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", sans-serif;
  padding: 40px;
}

.imagens-container img {
  width: 400px;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.expecificacoes-container {
  width: 600px;
  margin-top: 30px;
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

.botao-compra button {
  width: 200px;
  height: 45px;
  border-radius: 40px;
  border: none;
  background: #84827e;
  color: white;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.botao-compra button:hover {
  background-color: #6d6b68;
  transition: 0.3s ease;
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

.banner img {
  width: 100%;
  margin-top: 60px;
  border-radius: 20px;
}

.carregando,
.erro {
  font-family: "Poppins", sans-serif;
  text-align: center;
  font-size: 1.3rem;
  margin-top: 80px;
}
</style>
