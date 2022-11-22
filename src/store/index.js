import { createStore } from 'vuex'
// Usando o Localbase uma base de dados não relacional 
import Localbase from 'localbase'
let db = new Localbase('db')

export default createStore({
  state: {
    Moedas_observacao: [],
    // Variaveis para manipular o modal
    modal:false,
    // Variavel para manipular componente de mensagem
    mensagem:false
  },
  getters: {
  },
  mutations: {
    LISTAR_MOEDAS_OBSERVACAO(state) {
      db.collection('observacao').get().then(observacaoDB => {
        observacaoDB.forEach(code => {
          state.Moedas_observacao.push(code['code']);
        });
      })
    },
    VOLTAR_FALSE(state) {
    state.mensagem = false;
    }
  },
  actions: {

    ADD_MOEDAS_OBSERVACAO({commit}, payload) {
      db.collection('observacao').add({
        id: new Date().getTime(),
        code: payload
      }).then(() => {
        commit('LISTAR_MOEDAS_OBSERVACAO');
      })
    },

    REMOVE_MOEDAS_OBSERVACAO({ commit }, code) {
      db.collection('observacao').doc({code}).delete().then(() => {
        commit('LISTAR_MOEDAS_OBSERVACAO');
      })
    }

  },
  modules: {
  }
})