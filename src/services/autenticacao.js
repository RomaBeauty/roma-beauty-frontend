// services/autenticacao.js
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

export default {
  async cadastro(user) {
    try {
      const res = await axios.post(`${API_URL}/usuarios/`, user) // envia para o endpoint do Django
      return res.data
    } catch (err) {
      console.error('Erro no cadastro', err)
      return null
    }
  },

  async login(user) {
    try {
      const res = await axios.post(`${API_URL}/token/`, user) // se usar SimpleJWT
      return res.data
    } catch (err) {
      console.error('Erro no login', err)
      return null
    }
  }
}
