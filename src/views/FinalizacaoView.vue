<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Menu from '@/components/Menu.vue'
import CardsAleatorios from "@/components/CardsAleatorios.vue"
import Footer from '@/components/Footer.vue'
import LoadingPreloaderFinal from "@/components/LoadingPreloaderFinal.vue"
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
</script>
<template>

      <!-- preloader inicio -->

  <LoadingPreloaderFinal :ativoPreloader="loadingPreloaderAtivo">
    <template #extra>
    </template>
  </LoadingPreloaderFinal>

        <!-- preloader fim -->
<!-- ANIMAÇÃO DE COMPRA CONCLUÍDA -->
<div v-if="!loadingPreloaderAtivo" class="compra-concluida">
    <div class="central">
      <div class="circle-check">
        <svg viewBox="0 0 100 100" class="check-svg">
          <circle class="circle" cx="50" cy="50" r="48"/>
          <path class="check" d="M30 52 L45 67 L70 35"/>
        </svg>
      </div>
      <h1 class="shimmer-text">Compra Concluída!</h1>
      <p class="shimmer-text small">Obrigado por escolher a <strong>Roma Beauty</strong></p>
    </div>
  <div class="particles"></div>
  <div class="aura"></div>

  <div class="logo-animada">
    <span class="letra">R</span>
    <span class="letra">o</span>
    <span class="letra">m</span>
    <span class="letra">a</span>
    <span class="letra"> </span>
    <span class="letra">B</span>
    <span class="letra">e</span>
    <span class="letra">a</span>
    <span class="letra">u</span>
    <span class="letra">t</span>
    <span class="letra">y</span>
  </div>

  <h2 class="titulo-final">Compra concluída com sucesso</h2>
  <p class="mensagem-final">Seu brilho está a caminho </p>

<router-link to="/home" class="botao-retornar">Voltar a loja</router-link>
</div>

</template>

<style scoped>

/* central check */
.central {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}
.circle-check {
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
}
.check-svg {
  width: 150px;
  height: 150px;
  stroke-width: 5;
  fill: none;
}
.circle {
  stroke: #000000;
  stroke-dasharray: 302;
  stroke-dashoffset: 302;
  animation: draw-circle 1s forwards;
}

.check {
  stroke: #000000;
  stroke-dasharray: 60;
  animation: draw-check 0s 1s forwards;
}


@keyframes draw-check {
  to {
    stroke-dashoffset: 0; /* traço desenhado */
  }
}

@keyframes draw-circle {
  to { stroke-dashoffset: 0; }
}
@keyframes draw-check {
  to { stroke-dashoffset: 0; }
}

.compra-concluida {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: "Poppins", sans-serif;
  text-align: center;

}

.aura {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(104, 103, 103, 0.5), rgba(255,182,193,0.2), transparent);
  filter: blur(80px);
  animation: pulsar 5s ease-in-out infinite;
}

.particles::before,
.particles::after {
  content: "";
  position: absolute;
  width: 150%;
  height: 150%;
  background-image: radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: flutuar 20s linear infinite;
  opacity: 0.5;
}
.particles::after {
  animation-delay: 5s;
  opacity: 0.3;
}

/*  Logo animada com brilho */
.logo-animada {
  display: flex;
  gap: 4px;
  font-size: 3rem;
  font-weight: 700;
  color: #8a8a8a;
  letter-spacing: 1px;
  text-transform: uppercase;
  animation: fadeIn 2s ease forwards;
  z-index: 10;
  margin-bottom: 15px;
}

.logo-animada .letra {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: aparecerLetra 0.08s forwards;
}
.logo-animada .letra:nth-child(1) { animation-delay: 0.1s; }
.logo-animada .letra:nth-child(2) { animation-delay: 0.2s; }
.logo-animada .letra:nth-child(3) { animation-delay: 0.3s; }
.logo-animada .letra:nth-child(4) { animation-delay: 0.4s; }
.logo-animada .letra:nth-child(5) { animation-delay: 0.5s; }
.logo-animada .letra:nth-child(6) { animation-delay: 0.6s; }
.logo-animada .letra:nth-child(7) { animation-delay: 0.7s; }
.logo-animada .letra:nth-child(8) { animation-delay: 0.8s; }
.logo-animada .letra:nth-child(9) { animation-delay: 0.9s; }
.logo-animada .letra:nth-child(10) { animation-delay: 1.0s; }
.logo-animada .letra:nth-child(11) { animation-delay: 1.1s; }

.titulo-final {
  font-size: 2rem;
  color: #8d8d8d;
  font-weight: 600;
  margin-top: 20px;
  opacity: 0;
  animation: fadeUp 1.5s ease 1.2s forwards;
}

.mensagem-final {
  font-size: 1.2rem;
  color: #5a4b56;
  margin-top: 10px;
  opacity: 0;
  animation: fadeUp 1.5s ease 1.6s forwards;
}

/* Botão estiloso */
.botao-retornar {
  margin-top: 40px;
  background: linear-gradient(135deg, #7a6c74, #5a5959);
  color: white;
  border: none;
  padding: 14px 36px;
  border-radius: 40px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(71, 68, 69, 0.4);
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeUp 1.5s ease 2s forwards;
}
.botao-retornar:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(83, 82, 83, 0.6);
}

/* Keyframes */
@keyframes pulsar {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
}
@keyframes flutuar {
  from { transform: translateY(0); }
  to { transform: translateY(-200px); }
}
@keyframes aparecerLetra {
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}


</style>