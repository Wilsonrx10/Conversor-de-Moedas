<template>
<div>
     <toast_prime />
     <toast_prime position="top-left" group="tl" />
</div>
</template>

<script>
import { defineComponent,onMounted} from "vue";
import { useToast } from "primevue/usetoast";
import {useStore} from "vuex";
export default defineComponent({
    name:"Message_toast",
    setup() {
        const store = useStore();
        const toast = useToast();
        const showSuccess = () => {
            toast.add({severity:'success', summary: 'Adicionado', detail:'Moeda Adicionada para observação', life: 5000});
        }

        onMounted(() => {
        if (store.state.mensagem == true) {
        showSuccess();
        }
        })

      return { showSuccess}
    }
});
</script>

<style lang="scss" scoped>
button {
    min-width: 10rem;
    margin-right: .5rem;
}

@media screen and (max-width: 960px) {
    button {
        width: 100%;
        margin-bottom: .5rem;
    }
}
</style>