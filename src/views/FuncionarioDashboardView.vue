<template>
    <!-- Header moderno -->
    <v-row align="center" justify="space-between" class="header" style="margin-bottom: 24px; padding: 12px 24px; background: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <!-- Título -->
      <v-col cols="12" md="6">
        <div class="title-row">
          <h1 class="title">Painel de Pedidos</h1>
          <span class="subtitle">Monitoramento em tempo real — pedidos e informações da cidade</span>
        </div>
      </v-col>
  
      <!-- Menu -->
      <v-col cols="12" md="6" class="d-flex justify-end align-center gap-4">
        <v-btn :to="'/pedidos'" class="menu-btn blue-btn" rounded>
          <v-icon left>mdi-cart</v-icon> Pedidos
        </v-btn>
        <v-btn :to="'/'" class="menu-btn red-btn" rounded>
          <v-icon left>mdi-logout</v-icon> Sair
        </v-btn>
      </v-col>
    </v-row>
  
    <v-container fluid class="dashboard-container pa-6">
      <!-- Cards coloridos do topo -->
      <v-row dense>
        <v-col cols="12" sm="6" md="3">
          <v-card class="top-card blue-card pa-4">
            <div class="card-label">Cidades</div>
            <div class="card-value">{{ totalCidades || 0 }}</div>
            <v-icon class="card-icon">mdi-city</v-icon>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="6" md="3">
          <v-card class="top-card purple-card pa-4">
            <div class="card-label">Valor Total</div>
            <div class="card-value">R$ {{ formatarMoeda(valorTotal || 0) }}</div>
            <v-icon class="card-icon">mdi-cash</v-icon>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="6" md="3">
          <v-card class="top-card dark-card pa-4">
            <div class="card-label">Usuários</div>
            <div class="card-value">{{ totalUsuarios || 31 }}</div>
            <v-icon class="card-icon">mdi-account-group</v-icon>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="6" md="3">
          <v-card class="top-card orange-card pa-4">
            <div class="card-label">Produtos Vendidos</div>
            <div class="card-value">{{ totalProdutos || 74 }}</div>
            <v-icon class="card-icon">mdi-package-variant-closed</v-icon>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Gráfico principal -->
      <v-row class="mt-6" dense>
        <v-col cols="12">
          <v-card class="grafico-card">
            <v-card-title class="card-heading">Resumo dos Pedidos</v-card-title>
            <v-card-text>
              <component
                :is="Apex"
                type="area"
                height="400"
                :options="chartOptions"
                :series="chartSeries"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import axios from "axios";
  import VueApexCharts from "vue3-apexcharts";
  
  const Apex = VueApexCharts;
  
  // API
  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });
  
  // Dados
  const pedidos = ref([]);
  const usuarios = ref([]);
  
  // Totais
  const totalCidades = computed(() => new Set(pedidos.value.map(p => p.cidade)).size);
  const valorTotal = computed(() => pedidos.value.reduce((acc, p) => acc + Number(p.total || 0), 0));
  const totalUsuarios = computed(() => usuarios.value.length);
  const totalProdutos = computed(() =>
    pedidos.value.reduce((acc, p) => acc + (p.produtos?.length || 0), 0)
  );
  
  // Gráfico
  const chartOptions = ref({
    chart: { toolbar: { show: false }, zoom: { enabled: false } },
    xaxis: { categories: [] },
    stroke: { curve: "smooth", width: 2 },
    dataLabels: { enabled: false },
    grid: { borderColor: "#e6eef8" },
    tooltip: { theme: "light" },
  });
  const chartSeries = ref([{ name: "Total em R$", data: [] }]);
  
  // Funções
  function normalizeResponse(data) {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.results)) return data.results;
    if (Array.isArray(data.data)) return data.data;
    return [];
  }
  
  async function carregarPedidos() {
    try {
      const res = await api.get("/purchases/");
      pedidos.value = normalizeResponse(res.data);
    } catch (e) {
      console.error("Erro ao carregar pedidos:", e);
      pedidos.value = [];
    }
  }
  
  async function carregarUsuarios() {
    try {
      const res = await api.get("/users/");
      usuarios.value = normalizeResponse(res.data);
    } catch (e) {
      console.error("Erro ao carregar usuários:", e);
      usuarios.value = [];
    }
  }
  
  // Atualiza gráfico
  watch(pedidos, (val) => {
    const sorted = val.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const last = sorted.slice(-20);
    chartOptions.value.xaxis.categories = last.map((p, i) => p.nome || `#${p.id || i}`);
    chartSeries.value[0].data = last.map((p) => Number(p.total || 0));
  }, { immediate: true });
  
  function formatarMoeda(v) {
    return Number(v || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  
  onMounted(() => {
    carregarPedidos();
    carregarUsuarios();
  });
  </script>
  
  <style scoped>
  /* Menu moderno */
  .menu-btn {
    font-weight: 600;
    text-transform: none;
    transition: all 0.2s ease;
    padding: 8px 16px;
    border-radius: 8px;
    min-width: 140px;
  }
  
  /* Botão azul */
  .blue-btn {
    background-color: #202020;
    color: #fff;
  }
  .blue-btn:hover {
    background-color: #4e4e4e;
  }
  
  /* Botão vermelho */
  .red-btn {
    background-color: #202020;
    color: #fff;
  }
  .red-btn:hover {
    background-color: #4e4e4e;
  }
  
  /* Header */
  .header .title-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  /* Dashboard */
  .dashboard-container {
    background-color: #f7f9fc;
    min-height: 100vh;
  }
  
  /* Cards */
  .top-card {
    border-radius: 12px;
    color: white;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s;
  }
  .top-card:hover {
    transform: translateY(-4px);
  }
  .top-card .card-label {
    font-size: 0.85rem;
    opacity: 0.85;
  }
  .top-card .card-value {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 8px;
  }
  .top-card .card-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    opacity: 0.2;
    font-size: 2.2rem;
  }
  
  .blue-card { background: #3b82f6; }
  .purple-card { background: #8b5cf6; }
  .dark-card { background: #1e293b; }
  .orange-card { background: #f59e0b; }
  
  /* Gráfico */
  .grafico-card {
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 6px 18px rgba(12, 20, 40, 0.04);
  }
  </style>
  