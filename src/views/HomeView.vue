<template>
<div class="home">
  <ListCoin 
  :moedas="moedas" 
  :listamoedas="listamoedas"
  >
  <template v-slot:title>
   Moedas em R$
  </template>
  </ListCoin>
</div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue"
import ListCoin from "../components/ListCoin.vue";
import api from '../services/api'
export default {
    name:"App",
    setup() {
        // Variaveis do composition API 
        const variables = reactive({
        moedas:null
        });
        // Metodos do Composition API 
        onMounted(async () => {
            api.get("/all").then((response) => {
            variables.moedas = response.data
            }).catch((erro) => {
            console.log("ocorreu um erro na requisição: " +erro)
            })
        })

        return { 
        ...toRefs(variables),
        }
    },
    components: {ListCoin }
}
</script>