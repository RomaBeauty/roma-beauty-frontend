<template>
    <!-- Header moderno -->
    <v-row align="center" justify="space-between" class="header" style="margin-bottom: 24px; padding: 12px 24px; background: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <!-- Título -->
        <v-col cols="12" md="6">
            <div class="title-row">
                <h1 class="page-title">Pedidos Recebidos</h1>
                <span class="subtitle">Visualize e gerencie as compras realizadas</span>
            </div>
        </v-col>
  
        <!-- Menu -->
        <v-col cols="12" md="6" class="d-flex justify-end align-center gap-4">
            <v-btn :to="'/funcionario'" class="menu-btn blue-btn" rounded>
                <v-icon left>mdi-cart</v-icon> Monitoramento
            </v-btn>
  
            <v-btn :to="'/'" class="menu-btn red-btn" rounded>
                <v-icon left>mdi-logout</v-icon> Sair
            </v-btn>
        </v-col>
    </v-row>
  
    <v-container fluid class="pa-6 pedidos-container">
        <!-- Busca e tabela -->
        <v-row align="center" justify="space-between" class="mb-4">
            <v-col cols="12" md="4" class="d-flex justify-end">
                <v-text-field v-model="search" label="Pesquisar por nome ou cidade..." append-inner-icon="mdi-magnify"
                    variant="outlined" hide-details clearable class="search-field" @input="debouncedFetch" />
            </v-col>
        </v-row>
  
        <v-card class="elevation-1">
            <v-data-table :headers="headers" :items="pedidos" :loading="loading" :items-per-page="10" class="tabela">
                <template #item.nome="{ item }">
                    {{ item.nome }} {{ item.sobrenome }}
                </template>
                <template #item.total="{ item }">
                    R$ {{ formatarMoeda(item.total) }}
                </template>
                <template #item.created_at="{ item }">
                    {{ formatarData(item.created_at) }}
                </template>
                <template #item.status>
                    <v-chip color="green" size="small" text-color="white">Concluído</v-chip>
                </template>
                <template #item.acoes="{ item }">
                    <v-btn color="primary" variant="text" icon="mdi-eye" @click="verDetalhes(item.id)"></v-btn>
                </template>
            </v-data-table>
        </v-card>
  
        <div class="d-flex justify-center mt-4">
            <v-pagination v-model="pagina" :length="totalPaginas" @input="carregarPedidos" />
        </div>
    </v-container>
  </template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import debounce from "lodash/debounce";
import { useRouter } from "vue-router";

const router = useRouter();

// 🔗 API
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const token = localStorage.getItem("token");

const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: token ? `Bearer ${token}` : "" },
});

// 🔢 Refs
const pedidos = ref([]);
const loading = ref(false);
const search = ref("");
const pagina = ref(1);
const totalPaginas = ref(1);

// 🧾 Cabeçalhos
const headers = [
    { title: "ID", key: "id", sortable: true },
    { title: "Nome", key: "nome", sortable: true },
    { title: "Cidade", key: "cidade" },
    { title: "Data", key: "created_at" },
    { title: "Total", key: "total" },
    { title: "Status", key: "status" },
    { title: "Ações", key: "acoes", sortable: false },
];

// 💰 Formatação
function formatarMoeda(v) {
    const n = Number(v || 0);
    return n.toFixed(2).replace(".", ",");
}

function formatarData(dt) {
    if (!dt) return "-";
    return new Date(dt).toLocaleString("pt-BR");
}

// 📦 Buscar pedidos
async function carregarPedidos() {
  loading.value = true;
  try {
    const res = await api.get("/purchases/", {
      params: {
        page: pagina.value,
        search: search.value || undefined,
      },
    });

    // 👇 Adiciona ESTA LINHA
    console.log("📦 Dados recebidos:", res.data);

    // Detecta automaticamente o formato
    if (Array.isArray(res.data)) {
      pedidos.value = res.data;
      totalPaginas.value = 1;
    } else if (res.data.results && Array.isArray(res.data.results)) {
      pedidos.value = res.data.results;
      totalPaginas.value = Math.ceil((res.data.count || res.data.results.length) / 10);
    } else if (res.data.data && Array.isArray(res.data.data)) {
      pedidos.value = res.data.data;
      totalPaginas.value = 1;
    } else {
      console.warn("⚠️ Formato de resposta inesperado:", res.data);
      pedidos.value = [];
    }
  } catch (err) {
    console.error("❌ Erro ao carregar pedidos:", err);
    pedidos.value = [];
  } finally {
    loading.value = false;
  }
}

const debouncedFetch = debounce(() => {
    pagina.value = 1;
    carregarPedidos();
}, 500);

// 👁️ Ver detalhes
function verDetalhes(id) {
    router.push(`/pedido/${id}`);
}

onMounted(carregarPedidos);
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

/* Títulos e subtítulos */
.page-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #0f172a;
}
.subtitle {
  color: #64748b;
  font-size: 0.95rem;
}

/* Container */
.pedidos-container {
    background-color: #f8fafc;
    min-height: 100vh;
}

/* Busca */
.search-field {
    max-width: 320px;
}

/* Tabela */
.tabela {
    border-radius: 12px;
    background-color: #fff;
}
.v-data-table th {
    font-weight: 600;
    color: #334155;
}
.v-data-table td {
    color: #475569;
}
.v-chip {
    font-weight: 600;
    letter-spacing: 0.2px;
}
</style>