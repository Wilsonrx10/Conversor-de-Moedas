import { createApp } from 'vue'
import App from './App.vue'
// Importação do Bootstrap 
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap/dist/js/bootstrap.js"
/* Instalação do Fontawesome Vue
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/vue-fontawesome@prerelease
*/
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import store from './store'
import router from './router'
library.add(fas)
// Importação do PrimeVue 
import "primevue/resources/themes/saga-blue/theme.css"     
import "primevue/resources/primevue.min.css"                
import "primeicons/primeicons.css"       
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import Chips from 'primevue/chips';
import Dropdown from 'primevue/dropdown';

const app = createApp(App);

app.use(router)
app.use(store)
app.use(PrimeVue)
app.use(ToastService);
// Registro dos componentes
app.component('fas_icones',FontAwesomeIcon)
app.component("toast_prime",Toast)
app.component("Button_prime",Button)
app.component("AutoComplete",AutoComplete)
app.component("Chips_prime",Chips)
app.component("Dropdown_prime",Dropdown)
// Renderização globalmente 
app.mount('#app')
