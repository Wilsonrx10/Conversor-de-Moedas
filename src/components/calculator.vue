<template>
  <div class="card container" >
    <div class="card-header">
      <h4>CONVERSOR DE MOEDAS</h4>
    </div>
    <div class="card-body">

      <div class="conversao">

        <div class="form-group">
          <label for="">Valor</label>
          <input v-model="montante" type="number" class="form-control" placeholder="digita a quantidade">
        </div>

        <div class="DE">
          <label for="">DE</label> <br>

          <Dropdown_prime style="width:230px" v-model="moedaOrigem" :options="listamoedas" optionLabel="name" :filter="true"
            placeholder="Seleciona uma moeda" :showClear="true">
            <template #value="slotProps">
              <div class="country-item country-item-value" v-if="slotProps.value">
                <div>{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="country-item">
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown_prime>

        </div>


        <div class="form-group">
          <label for="">Inverter</label> <br>
          <fas_icones @click="Inverter_preco" icon="right-left" class="inverter" style="color:rgb(26, 104, 230);">
          </fas_icones>
        </div>


        <div class="PARA">
          <label for="">PARA</label> <br>

          <Dropdown_prime style="width:230px" v-model="moedaDestino" :options="listamoedas" optionLabel="name" :filter="true"
            placeholder="Seleciona uma moeda" :showClear="true">
            <template #value="slotProps">
              <div class="country-item country-item-value" v-if="slotProps.value">
                <div>{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="country-item">
                <div >{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown_prime>

        </div>

      </div><br>


      <button @click="Calcular_moeda" class="btn btn-primary" :disabled="estado_botao">Efetuar operação <img
          v-if="estado_loading" src="imagens/loading.gif" width="25"> </button> <br> <br>

      <div v-if="resultado">
        <strong style="font-size: 20px;">{{ montante }} {{ Origem }} = </strong>
        <strong style="font-size: 40px;">{{ montanteConvertido }} {{ Destino }}</strong>
      </div> <br>

      <div class="informacao">
        <p class="info">Usamos a taxa de mercado médio no nosso Conversor. Isso é apenas para fins informativos.
          Você não pagará essa taxa ao enviar dinheiro. Consulte as taxas de envio.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive, toRefs } from 'vue';
import exchange from '../services/BNA'
export default {
  name: "calculador_coin",
  setup() {
    onMounted(() => {
      
      lista_moedas_BNA();
    })

    //======================================================================
    // CALCULO CAMBIAL 
    //======================================================================

    const variables = reactive({
      // variaveis para o calculo da moeda
      moedaOrigem: null,
      moedaDestino: null,
      Destino:null,
      Origem:null,
      montante: 1,
      montanteConvertido: null,
      estado_loading: false,
      estado_botao: null,
      // variaveis para minipulação do resultado 
      resultado: false
    });

    const Calcular_moeda = async () => {
      // Verificar os campos do formulário 
      if (variables.moedaOrigem && variables.moedaDestino == "") {
        return false;
      }
      // Atribuir os valores para apresentação do resultado 
      variables.Destino = variables.moedaDestino['codigoMoeda']
      variables.Origem = variables.moedaOrigem['codigoMoeda']
      // Mudar os estado do Botão 
      variables.estado_loading = true;
      variables.estado_botao = true;
      exchange.get(`/conversor/moeda?moedaOrigem=${variables.moedaOrigem['codigoMoeda']}&moedaDestino=${variables.moedaDestino['codigoMoeda']}&montante=${variables.montante}`).then((response) => {
        let dados = response.data;
        // Fazer a formatação do valor convertido 
        const valor = dados['genericResponse'][1]['montanteConvertido'];
        variables.montanteConvertido = valor.toLocaleString('pt-AO', { minimumFractionDigits: 2 });
        // Mudar os estado do Botão 
        variables.estado_loading = false;
        variables.estado_botao = null;
        // Mudar o Estado da Div Resultado 
        variables.resultado = true;
      }).catch((erro) => {
        console.log("ocorreu um erro na requisição: " + erro)
      })
    }

    const Buscar_lista_moedas_BNA = () => {
      exchange.get("/get/lista/moedas").then((response) => {
      let dados_json = response.data['genericResponse'].JSON.stringify(variables.lista_moedas, null, 2);
      console.log(dados_json)
      }).catch((erro) => {
        console.log(erro)
      })
    }

    const lista_moedas_BNA = async () => {
      const req = await fetch("demo/data/moedas.json");
      const res = await req.json();
      listamoedas.value = res
    }

    //======================================================================
    // Autocomplete MoedaOrigem #1
    //======================================================================

    const selectedMoeda = ref();
    const loading = ref(false);
    let listamoedas = ref();
    const items = ref(Array.from({ length: 100000 }, (_, i) => ({ label: `Item #${i}`, value: i })));
    const lazyItems = ref(Array.from({ length: 100000 }));

    const onLazyLoad = (event) => {
      this.loading = true;

      if (this.loadLazyTimeout) {
        clearTimeout(this.loadLazyTimeout);
      }

      // imitar o atraso de uma chamada de back-end
      this.loadLazyTimeout = setTimeout(() => {
        const { first, last } = event;
        const lazyItems = [...this.lazyItems];

        for (let i = first; i < last; i++) {
          lazyItems[i] = { label: `Item #${i}`, value: i };
        }

        this.lazyItems = lazyItems;
        this.loading = false;
      }, Math.random() * 1000 + 250);
    }

    

    //======================================================================
    // Autocomplete MoedaDestino #2
    //======================================================================

    const selectedMoeda2 = ref();
    const loading2 = ref(false);
    const items2 = ref(Array.from({ length: 100000 }, (_, i) => ({ label: `Item #${i}`, value: i })));
    const lazyItems2 = ref(Array.from({ length: 100000 }));

    const onLazyLoad2 = (event) => {
      this.loading = true;

      if (this.loadLazyTimeout) {
        clearTimeout(this.loadLazyTimeout);
      }

      // imitar o atraso de uma chamada de back-end
      this.loadLazyTimeout = setTimeout(() => {
        const { first, last } = event;
        const lazyItems = [...this.lazyItems];

        for (let i = first; i < last; i++) {
          lazyItems[i] = { label: `Item #${i}`, value: i };
        }

        this.lazyItems = lazyItems;
        this.loading = false;
      }, Math.random() * 1000 + 250);
    }

   
    //======================================================================
    // Inverter os valores das moedas
    //======================================================================
    const Inverter_preco = () => {
      const inverter_valor1 = variables.moedaDestino
      const inverter_valor2 = variables.moedaOrigem
      // Trocar os valores 
      variables.moedaDestino = inverter_valor2;
      variables.moedaOrigem = inverter_valor1;
      // Atualizar os valores para apresentação do resultado 
      variables.Destino = variables.moedaDestino['codigoMoeda']
      variables.Origem = variables.moedaOrigem['codigoMoeda']
      // Realizar novamente uma consulta Ajax 
      variables.estado_loading = true;
      variables.estado_botao = true;
      exchange.get(`/conversor/moeda?moedaOrigem=${variables.moedaOrigem['codigoMoeda']}&moedaDestino=${variables.moedaDestino['codigoMoeda']}&montante=${variables.montante}`).then((response) => {
        let dados = response.data;
        variables.montanteConvertido = dados['genericResponse'][1]['montanteConvertido'];
        // Mudar os estado do Botão 
        variables.estado_loading = false;
        variables.estado_botao = null;
      }).catch((erro) => {
        console.log("ocorreu um erro na requisição: " + erro)
      })
    }

    return {
      // Autocomplete Moeda Origem
      selectedMoeda,
      listamoedas,
      loading,
      items,
      lazyItems,
      onLazyLoad,
      // Autocomplete Moeda Destino 
      selectedMoeda2,
      loading2,
      items2,
      lazyItems2,
      onLazyLoad2,
      // comportamento da aplicação 
      ...toRefs(variables),
      Calcular_moeda,
      Buscar_lista_moedas_BNA,
      lista_moedas_BNA,
      Inverter_preco
    }
  },
  loadLazyTimeout: null,
}
</script>

<style scoped>
.conversao {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}
.inverter {
  border: 1px solid #ddd;
  width: 300px;
  padding: 10px;
}
.info {
  width: 450px;
  border: 1px solid #ddd;
  padding: 20px;
  border-left: 4px solid red;
}
.card {
  background-color: white;
  box-shadow: 4px 6px 6px 6px #ddd;
}
</style>