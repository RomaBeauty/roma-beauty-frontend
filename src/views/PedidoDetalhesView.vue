<template>
    <v-container fluid class="pa-6 detalhes-container">
      <v-btn prepend-icon="mdi-arrow-left" variant="text" @click="router.push('/pedidos')">
        Voltar
      </v-btn>
  
      <v-card class="pa-6 mt-4">
        <h1 class="titulo">Detalhes do Pedido #{{ pedido?.id }}</h1>
        <p class="subtitulo">Realizado em {{ formatarData(pedido?.created_at) }}</p>
  
        <v-divider class="my-4"></v-divider>
  
        <v-row>
          <v-col cols="12" md="6">
            <h3 class="secao-titulo">Dados do Cliente</h3>
            <p><strong>Nome:</strong> {{ pedido?.nome }} {{ pedido?.sobrenome }}</p>
            <p><strong>Email:</strong> {{ pedido?.email }}</p>
            <p><strong>Telefone:</strong> {{ pedido?.telefone }}</p>
            <p><strong>Cidade:</strong> {{ pedido?.cidade }} - {{ pedido?.estado }}</p>
            <p><strong>Endereço:</strong> {{ pedido?.rua }}, {{ pedido?.numero }}</p>
            <p v-if="pedido?.complemento"><strong>Complemento:</strong> {{ pedido?.complemento }}</p>
          </v-col>
  
          <v-col cols="12" md="6">
            <h3 class="secao-titulo">Resumo da Compra</h3>
            <p><strong>Total:</strong> R$ {{ formatarMoeda(pedido?.total) }}</p>
            <p><strong>Atualizado em:</strong> {{ formatarData(pedido?.updated_at) }}</p>
          </v-col>
        </v-row>
  
        <v-divider class="my-6"></v-divider>
  
        <h3 class="secao-titulo mb-2">Itens do Pedido</h3>
        <v-data-table
          :headers="headers"
          :items="itens"
          class="elevation-1"
          density="compact"
        >
          <template #item.preco_unitario="{ item }">
            R$ {{ formatarMoeda(item.preco_unitario) }}
          </template>
  
          <template #item.subtotal="{ item }">
            R$ {{ formatarMoeda(item.quantidade * item.preco_unitario) }}
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import axios from "axios"
  
  const route = useRoute()
  const router = useRouter()
  const pedido = ref(null)
  const itens = ref([])
  const loading = ref(true)
  
  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api"
  const token = localStorage.getItem("token")
  
  const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  })
  
  // cabeçalhos da tabela
  const headers = [
    { title: "Produto", key: "produto_nome" },
    { title: "Qtd", key: "quantidade" },
    { title: "Preço Unitário", key: "preco_unitario" },
    { title: "Subtotal", key: "subtotal" },
  ]
  
  // funções auxiliares
  function formatarMoeda(v) {
    const n = Number(v || 0)
    return n.toFixed(2).replace(".", ",")
  }
  function formatarData(dt) {
    if (!dt) return "-"
    return new Date(dt).toLocaleString("pt-BR")
  }
  
  // carregar pedido completo
  async function carregarPedido() {
    try {
      const res = await api.get(`/purchases/${route.params.id}/`)
      pedido.value = res.data
      itens.value = res.data.itens || []
    } catch (e) {
      console.error("Erro ao carregar pedido:", e)
    } finally {
      loading.value = false
    }
  }
  
  onMounted(carregarPedido)
  </script>
  
  <style scoped>
  .detalhes-container {
    background-color: #f8fafc;
    min-height: 100vh;
  }
  .titulo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
  }
  .subtitulo {
    color: #64748b;
  }
  .secao-titulo {
    font-weight: 600;
    margin-bottom: 6px;
    color: #334155;
  }
  </style>
  