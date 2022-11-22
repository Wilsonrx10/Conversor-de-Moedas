<template>
  <div class="container">

    <div class="mt-2 text-right">
      <div class="tabela">
        <h2 class="Light">Moedas em Observação</h2>
        <table class="table table-hover">
          <thead class="table-info">
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Nome</th>
              <th scope="col">Minimo</th>
              <th scope="col">Máximo</th>
              <th scope="col">Variação</th>
              <th scope="col">Alerta</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(moedas, key) in moedas" :key="key">
              <td>{{key}}</td>
              <td>{{moedas.name}}</td>
              <td>{{moedas.high}}</td>
              <td>{{moedas.low}}</td>
              <td>
                <span class="badge" :class="{
                  'text-bg-success': moedas.pctChange > 0, 'text-bg-danger': moedas.pctChange < 0,
                  'text-bg-secondary': moedas.pctChange == 0
                }">
                  {{ moedas.pctChange }} %
                </span>
              </td>
              <td>
                <button @click="ModalAlert" class="btn btn-primary small">
                  <fas_icones icon="bell" style="color:white">
                  </fas_icones>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <cite class="text-small">Atualizará novamente em <b>{{timeUpdate}} segundos</b></cite>
      </div>
    </div>

    <div class="teste" v-if="$store.state.modal">
      <Modal/>
    </div>

  </div>
</template>

<script>
import { ref, toRefs, reactive, onMounted, watch, onUnmounted } from "vue";
import api from '../services/api'
import { useStore } from 'vuex'
import Modal from "./layout/Modal.vue";

const CURRENT_UPDATE_TIME = 30

export default {
  setup() {
    const store = useStore();
    const moedas = ref({});
    const timeUpdate = ref(CURRENT_UPDATE_TIME);
    const intervalo = ref(null);
    const metodos = reactive({
      async refresh() {
        if (store.state.Moedas_observacao.length <= 0) {
          return false;
        } else {
          // Converter o Array em String
          let code = store.state.Moedas_observacao.join();
          api.get(`/last/${code}`).then((response) => {
            moedas.value = response.data;
          }).catch((erro) => {
            console.log("ocorreu um erro na requisição: " + erro);
          });
        }
      },
      restartInterval() {
        clearInterval(intervalo.value);
        timeUpdate.value = CURRENT_UPDATE_TIME;
        intervalo.value = setInterval(() => {
          timeUpdate.value -= 1;
          if (timeUpdate.value == 0) {
            timeUpdate.value = CURRENT_UPDATE_TIME;
            this.refresh();
          }
        }, 1000);
      },

      ModalAlert() {
        store.state.modal = true;
      }
    });
    onMounted(() => {
      store.commit("LISTAR_MOEDAS_OBSERVACAO");
      metodos.refresh();
      metodos.restartInterval();
    });
    onUnmounted(() => {
      clearInterval(intervalo.value);
    });
    watch(() => {
      metodos.refresh();
      metodos.restartInterval();
    });
    return {
      ...toRefs(metodos),
      moedas,
      intervalo,
      timeUpdate
    };
  },
  components: { Modal }
}
</script>

<style scoped>
cite {
  background-color: #ddd;
  padding: 12px;
  border-left: 4px solid green;
}

.tabela {
  background-color: white;
  box-shadow: 4px 6px 6px 8px #ddd;
  padding: 30px;
}
</style>