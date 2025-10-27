<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Menu from '@/components/Menu.vue'

const route = useRoute()
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Campos do formulário
const nome = ref('')
const sobrenome = ref('')
const email = ref('')
const telefone = ref('')
const cep = ref('')
const rua = ref('')
const bairro = ref('')
const cidade = ref('')
const estado = ref('')
const numero = ref('')
const complemento = ref('')

// Itens da sacola
const itensSacola = ref([])

// Total local (antes de enviar)
const total = computed(() =>
  itensSacola.value.reduce(
    (sum, item) => sum + (item.produto?.preco || 0) * (item.quantidade || 1),
    0
  )
)

// Total confirmado pelo backend
const totalCompra = ref(0)

// Feedback para o usuário
const mensagem = ref('')
const erro = ref('')

// Puxa itens da sacola via query
onMounted(() => {
  if (route.query.sacola) {
    try {
      itensSacola.value = JSON.parse(route.query.sacola)
    } catch (e) {
      console.error('Erro ao ler sacola:', e)
    }
  }
})

// Função para buscar CEP
const buscarCep = async () => {
  const cepLimpo = cep.value.replace(/\D/g, '')
  if (cepLimpo.length !== 8) {
    alert('CEP inválido')
    return
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    if (response.data.erro) {
      alert('CEP não encontrado')
      rua.value = ''
      bairro.value = ''
      cidade.value = ''
      estado.value = ''
    } else {
      rua.value = response.data.logradouro
      bairro.value = response.data.bairro
      cidade.value = response.data.localidade
      estado.value = response.data.uf
    }
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
    alert('Erro ao buscar CEP')
  }
}

// Função para enviar formulário + itens da sacola
const enviarFormulario = async () => {
  if (itensSacola.value.length === 0) {
    alert('Sua sacola está vazia!')
    return
  }

  const dados = {
    nome: nome.value,
    sobrenome: sobrenome.value,
    email: email.value,
    telefone: telefone.value,
    cep: cep.value,
    rua: rua.value,
    bairro: bairro.value,
    cidade: cidade.value,
    estado: estado.value,
    numero: numero.value,
    complemento: complemento.value,
    itens: itensSacola.value.map(item => ({
      produto_id: item.produto.id,
      produto_nome: item.produto.nome,
      quantidade: item.quantidade,
      preco_unitario: item.produto.preco
    }))
  }

  try {
    const response = await axios.post(`${API_URL}/purchases/`, dados)
    mensagem.value = response.data.message || 'Compra realizada com sucesso!'
    erro.value = ''

    // Pegar o total enviado pelo backend
    totalCompra.value = response.data.data.total || 0

    // Limpar formulário e sacola
    nome.value = ''
    sobrenome.value = ''
    email.value = ''
    telefone.value = ''
    cep.value = ''
    rua.value = ''
    numero.value = ''
    bairro.value = ''
    complemento.value = ''
    cidade.value = ''
    estado.value = ''
    itensSacola.value = []
  } catch (error) {
    erro.value = error.response?.data?.detail || 'Erro ao enviar formulário'
    mensagem.value = ''
    console.error('Erro ao enviar formulário:', error)
  }
}
</script>


<template>
   <Menu/>

<div v-if="loading" class="carregando">Carregando produto...</div>
  <div class="container">
    <!-- lado esquerdo: formulário -->
    <div class="lado1">
      <div class="formulario">
        <form @submit.prevent="enviarFormulario">
          <div class="linha">
            <div class="campo"><input v-model="nome" placeholder="Nome" required /></div>
            <div class="campo"><input v-model="sobrenome" placeholder="Sobrenome" required /></div>
          </div>

          <div class="linha">
            <div class="campo unico"><input v-model="email" type="email" placeholder="Email" required /></div>
          </div>

          <div class="linha">
            <div class="campo unico"><input v-model="telefone" type="tel" placeholder="Telefone" required /></div>
          </div>

          <div class="linha">
            <div class="campo cep-container">
              <input v-model="cep" placeholder="CEP" required />
              <button type="button" @click="buscarCep">Buscar CEP</button>
            </div>
          </div>

          <div class="linha">
            <div class="campo"><input v-model="rua" placeholder="Rua" readonly /></div>
            <div class="campo"><input v-model="numero" placeholder="Número" required /></div>
          </div>

          <div class="linha">
            <div class="campo"><input v-model="bairro" placeholder="Bairro" readonly /></div>
            <div class="campo"><input v-model="complemento" placeholder="Complemento" /></div>
          </div>

          <div class="linha">
            <div class="campo"><input v-model="cidade" placeholder="Cidade" readonly /></div>
            <div class="campo"><input v-model="estado" placeholder="Estado" readonly /></div>
          </div>

          <button type="submit">Enviar</button>

          <p v-if="mensagem" style="color: green; margin-top: 10px;">{{ mensagem }}</p>
          <p v-if="erro" style="color: red; margin-top: 10px;">{{ erro }}</p>
        </form>
      </div>
    </div>

    <!-- lado direito: resumo da sacola -->
    <div class="lado2">
      <h2>Resumo da Compra</h2>

      <div v-if="itensSacola.length === 0">Nenhum item na sacola.</div>

      <div v-else>
        <div class="item" v-for="item in itensSacola" :key="item.produto.id">
          <div class="imagem-produto">
            <img :src="item.produto?.imagem_produto || '/fallback.png'" alt="Produto" />
            <div class="quantidade">{{ item.quantidade }}</div>
          </div>
          <div class="info-produto">
            <p class="nome-produto">{{ item.produto?.nome }}</p>
            <p class="valor-produto">
              R$ {{ ((item.produto?.preco || 0) * (item.quantidade || 1)).toLocaleString('pt-BR', {
                minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
            </p>
          </div>
        </div>

        <div class="resumo">
          <div class="linha-resumo total">
            <span>Total</span>
            <span>
              R$ {{ (totalCompra.value || total).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              maximumFractionDigits: 2 }) }}
            </span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh; /* ocupa toda a altura da tela */
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

.lado1 {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  flex: 1;
  text-align: center;
  padding: 20px;
  border-right: 1px solid #ccc;
  background-color: #fff;
  margin-top: 150px;
}

.lado2 {
  flex: 1;
  background-color: rgb(241, 240, 237);
  padding: 30px;
  overflow-y: auto;
  height: 100vh;
}


.lado2 {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.lado2 h2{
  margin-top: 80px;
  text-align: center;;
}

.formulario form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
}

.linha {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.campo {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.campo input {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
}

.campo.unico {
  flex: 1 1 100%;
}

button {
  padding: 12px;
  border-radius: 8px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #555;
}


.item {
  display: flex;
  gap: 30px;
  padding: 10px;
  border-top: #c8c8c889 solid 0.1px;
  border-bottom: #c8c8c889 solid 0.1px;
  height: 100px;
}

.imagem-produto {
  position: relative;
  width: 70px;
  height: 70px;
}

.imagem-produto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-top: 5px;
  border: #555555 solid 1px;;
  border-radius: 6px;
}

.quantidade {
  position: absolute;
  top: -2px;
  right: -10px;
  background-color: #333;
  color: #fff;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
}

.info-produto {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}

.nome-produto {
  font-weight: bold;
  font-size: 1rem;
}

.valor-produto {
  color: #555;
  font-weight: 600;
}

.resumo {
  margin-top: 20px;
}

.resumo span{
  font-size: 2rem;
  margin-top: 20px;
}

.linha-resumo {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.2rem;
}

.cep-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.buscar-cep {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
  font-size: 0.9rem;
}

.buscar-cep:hover {
  background-color: #555;
}



/* Logo e histórico */
.logo img {
  width: 280px;
  height: 150px;
  margin-top: -30px;
}

.historico {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: -35px;
}
</style>
