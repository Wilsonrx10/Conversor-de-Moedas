<template>
<div>
  <div class="navegacao">
    <navegacao_header/> 
    <router-view/>
    <Rodape/>
  </div> <br>

</div>
</template>

<script>
import navegacao_header from "./components/layout/Navegacao"
import Rodape from "./components/layout/rodape.vue";
export default {
    name:"App",
    setup() {
    },
    components: { navegacao_header, Rodape }
}
</script>