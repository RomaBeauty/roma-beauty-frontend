import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import CardsView from '../views/CardsView.vue'
import EspecificacaoView from '../views/EspecificacaoView.vue'
import CompraView from '../views/CompraView.vue'
import ColecaoPageView from '@/views/ColecaoPageView.vue'
import SacolaView from '@/views/SacolaView.vue'
import FavoritoView from '@/views/FavoritoView.vue'
import FuncionarioDashboardView from '@/views/FuncionarioDashboardView.vue'
import PedidosView from '@/views/PedidosView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView,
    },
    {
      path: '/cards',
      name: 'Cards',
      component: CardsView
    },
    {
      path: '/especificacao',
      name: 'Especificacao',
      component: EspecificacaoView
    },
    {
      path: '/compra',
      name: 'Compra',
      component: CompraView
    },
    {
      path: '/colecao/:id',
      name: 'Colecao',
      component: ColecaoPageView
    },
    {
      path: '/sacola',
      name: 'Sacola',
      component: SacolaView
    },
    {
      path: '/favorito',
      name: 'Favorito',
      component: FavoritoView
    },
    {
      path: '/funcionario',
      component: FuncionarioDashboardView,
      beforeEnter: (to, from, next) => {
        const tipo = localStorage.getItem('tipo_usuario');
        if (tipo === 'funcionario') {
          next();
        } else {
          next('/home');
        }
      }
    },
    
    {
      path: '/pedidos',
      name: 'Pedidos',
      component: PedidosView
    },
    {
      path: '/pedido/:id',
      name: 'PedidoDetalhes',
      component: () => import('../views/PedidoDetalhesView.vue'),
    },
  ],
})

export default router
