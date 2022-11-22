<template>
    <div>
        <Dialog header="Alerta de Preço" v-model:visible="displayModal"
            :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '50vw' }" :modal="true">
            <div class="container">

                <div class="form-group">
                    <label>Preço Base</label>
                    <input type="number" class="form-control">
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control"
                        placeholder="digita o email onde vais receber alerta de preço">
                </div>

            </div>
            <template #footer>
                <Button_prime label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-text" />
                <Button_prime label="Adicionar" icon="pi pi-check" @click="closeModal" autofocus />
            </template>
        </Dialog>

    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Dialog from 'primevue/dialog';
import {useStore} from "vuex"
export default {
    name: "Modal_coin",
    setup() {
        const store = useStore();
        const displayModal = ref(false);

        const openModal = () => {
        displayModal.value = true;
        }
        const closeModal = () => {
        displayModal.value = false;
        store.state.modal = false;
        }

        onMounted(()=>{
        openModal();
        })

        return {displayModal, openModal, closeModal}
    },
    components: { Dialog }
}
</script>

<style scoped lang="scss">
.p-button {
    margin: 0.3rem .5rem;
    min-width: 10rem;
}

p {
    margin: 0;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-dialog .p-button {
    min-width: 6rem;
}
</style>