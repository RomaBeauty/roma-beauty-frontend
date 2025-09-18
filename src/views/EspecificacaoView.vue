<script setup lang="ts">
import { ref } from 'vue'


// Accordion state
const activeSection = ref<string | null>(null)
const toggleSection = (section: string) => {
  activeSection.value = activeSection.value === section ? null : section
}


// Galeria de imagens
const imagens = [
  '/cabelo/valentine-cabelo2.png',
  '/cabelo/valentine-cabelo3.png',
  '/cabelo/valentine-cabelo4.png'
]


const imagemAtual = ref(imagens[0])
const trocarImagem = (src: string) => {
  if (imagemAtual.value !== src) imagemAtual.value = src
}


// Lista de passos

const passos = [
  { numero: 1, titulo: "Shampoo Super", desc: "Limpa e hidrata", subtitulo: "Limpeza", img: "/imagem/shampoo-conteudo.png" },
  { numero: 2, titulo: "Condicionador Super", desc: "Nutre e desembaraça", subtitulo: "Ajuda", img: "/imagem/hidratação-conteudo.png" },
  { numero: 3, titulo: "Máscara Super", desc: "Hidratação profunda", subtitulo: "Tratamento", img: "/imagem/shampoo-conteudo.png" },
  { numero: 4, titulo: "Óleo Super", desc: "Brilho e maciez", subtitulo: "Finalização", img: "/imagem/spray-conteudo.png" },
  { numero: 5, titulo: "Geleia Super", desc: "Modela e define", subtitulo: "Estilo", img: "/imagem/oil-conteudo.png" },
  { numero: 6, titulo: "Leave-in Super", desc: "Protege e suaviza", subtitulo: "Proteção", img: "/imagem/pentear-conteudo.png" }
]

const passoAtivo = ref(passos[0])

const trocarPasso = (passo: any) => {
  passoAtivo.value = passo
}
</script>

<template>
  <div class="container">
    <div class="imagens-container">
      <img src="/cabelo/valentine-cabelo2.png" alt="">
    </div>

    <!-- ESPECIFICAÇÕES -->
    <div class="expecificacoes-container">
      <div class="icones">
        <div class="icone-carrinho"><i class="fa-solid fa-cart-shopping"></i></div>
        <div class="icone-favorito"><i class="fa-regular fa-heart"></i></div>
      </div>
      <div class="expecificacao">Máscara Super Inteligente 500g</div>

      <div class="expecificacao-menor">Cabelo</div>
      <div class="detalhes">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, veniam! Commodi amet
        placeat est dignissimos voluptatem deserunt exercitationem quo iure quasi laudantium velit quibusdam praesentium
        error, quos provident. Iure, quisquam.</div>
      <div class="estrelas">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </div>
      <div class="botao-compra"><router-link to="/compra"><button>Comprar</button></router-link></div>
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

    <div class="cores-container">
      <!-- lado esquerdo: imagem + círculos -->
      <div class="esquerda">
        <!-- imagem -->
        <transition name="fade" mode="out-in">
          <img :key="passoAtivo.img" :src="passoAtivo.img" alt="" class="imagem-passo" />
        </transition>

        <!-- círculos embaixo da imagem -->
        <div class="texto">
        <transition name="fade" mode="out-in">
          <div :key="passoAtivo.numero">
            <h3>{{ passoAtivo.titulo }}</h3>
            <div class="linha"></div>
            <p>{{ passoAtivo.desc }}</p>
          </div>
        </transition>
      </div> 

        <div class="circulos">
          <div v-for="p in passos" :key="p.numero" class="circle" :class="{ ativo: passoAtivo.numero === p.numero }"
            @mouseenter="trocarPasso(p)">
            <h1>{{ p.numero }}</h1>
            <h2>{{ p.subtitulo }}</h2>
          </div>
        </div>
      </div>

      
    </div>
    <div class="imagem-container"></div>
    <div class="banner">
      <img src="/public/cabelo/valentine-juntos.png" alt="">
    </div>


  </div>

  <!-- Dica: este link do Font Awesome é melhor ficar em index.html -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
    integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');

* {
  font-family: "Poppins", sans-serif;

}

.linha{
  width: 50vh;
  height: 1px;
  background-color: #333;
  position: relative;
  z-index: 1;
}

.texto p{
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


.texto{
  margin-top: -40vh;
  margin-left: 50px;
  z-index: 1;
}

/* círculos grudados abaixo da imagem */
.circulos {
  display: flex;
  gap: 20px;
  margin-left: 50px;
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
  width: 100vh;
}


.imagens-container img {
  margin-left: 75px;
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
  background-size: cover;       /* cobre toda a div */
  background-position: center;  /* centraliza a imagem */
  background-repeat: no-repeat; /* não repete */
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
</style>