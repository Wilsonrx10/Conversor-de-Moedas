<template>
  <div class="container">
    <div class="pesquisar">
      <input @keyup="Pesquisar(pesquisa)" v-model="pesquisa" class="form-control" type="search" name="" id=""
        placeholder="pesquisar">
    </div>
    <div class="tabela">
      <h2>
        <slot name="title"></slot>
      </h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Nome</th>
            <th scope="col">Minimo</th>
            <th scope="col">Máximo</th>
            <th scope="col">Variação</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          <div v-if="resultado" class="sem-resultado">
            <p>Nenhuma moeda encontrada</p>
          </div>
          <tr v-for="(moedas, key) in moedas" :key="key">
            <td>{{ key }}</td>
            <td>{{ moedas.name }}</td>
            <td>{{ moedas.high }} R$</td>
            <td>{{ moedas.low }} R$</td>
            <td>
              <span class="badge" :class="{
                'text-bg-success': moedas.pctChange > 0, 'text-bg-danger': moedas.pctChange < 0,
                'text-bg-secondary': moedas.pctChange == 0
              }">
                {{ moedas.pctChange }} %
              </span>
            </td>
            <td>

              <button v-if="!listamoedas.includes(key)" @click="listen(key), mensagem()" class="btn btn-primary small">
                <fas_icones icon="plus" style="color:white">
                </fas_icones>
              </button>

              <button v-else @click="unlisten(key)" class="btn btn-danger small">
                <fas_icones icon="ban" style="color:white">
                </fas_icones>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!---Importação do componente de Mensagem-->
    <Messages v-if="$store.state.mensagem" />
  </div>
</template>

<script>
import Messages from './Messages.vue';
import { onMounted, reactive, toRefs } from "vue"
import { useStore } from 'vuex'
export default {
  setup(props) {

    // Importando a Store 
    const store = useStore()
    
    const variables = reactive({
      msg: false,
      listamoedas: store.state.Moedas_observacao,
      pesquisa: null,
      Moedas_listagem:null,
      // variavel para minipular pesquisa
      resultado:false
    })

    // Metódos da aplicação 
    function mensagem() {
    store.state.mensagem = true
    }

    function listen(code) {
      store.dispatch("ADD_MOEDAS_OBSERVACAO", code)
    }

    function unlisten(code) {
      store.dispatch("REMOVE_MOEDAS_OBSERVACAO", code)
    }

    const Pesquisar = (pesquisa) => {
      // Executar a rotina quando tiver 3 elementos na variavel
      if (pesquisa.length >= 3 && isNaN(pesquisa)) {
        // Trazer todas moedas disponiveis 
        const Moedas_disponiveis = JSON.parse(JSON.stringify(props.moedas))
        // Pesquisar no Array o nome dessa moeda 
        const Moedas_filtrada = Object.values(Moedas_disponiveis).filter((nome) => {
        return nome.name.includes(pesquisa)
        });
        // Mostrar o filtro realizado 
        console.log(Moedas_filtrada)
        // Verificar se foi encontrado algo na pesquisa
        if(Moedas_filtrada.length > 0){
        variables.Moedas_listagem = Moedas_filtrada
        variables.resultado = false;
        } else {
        variables.resultado = true;
        variables.Moedas_listagem = ""
        }
      } else {
        // Mostrar todas moedas
        
      }
    }
    onMounted(() => {
      store.commit("LISTAR_MOEDAS_OBSERVACAO");
    })

    return { ...toRefs(variables), listen, mensagem, unlisten, Pesquisar }

  },
  props: { moedas: { type: Object, required: true } },
  components: { Messages }
}
</script>

<style scoped>
.tabela {
  background-color: white;
  box-shadow: 4px 6px 6px 8px #ddd;
  padding: 30px;
}

.pesquisar input {
  width: 700px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>