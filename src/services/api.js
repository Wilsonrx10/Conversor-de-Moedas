import axios from "axios"
// API para buscar todas moedas pareada com o R$
const api = axios.create({
    baseURL: "http://economia.awesomeapi.com.br/json"
});

export default api