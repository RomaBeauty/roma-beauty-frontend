import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import CardsView from '../views/CardsView.vue'
import EspecificacaoView from '../views/EspecificacaoView.vue'
import CompraView from '../views/CompraView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
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
    }
  ],
})

export default router
