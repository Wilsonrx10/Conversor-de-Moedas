import axios from "axios"
// API para buscar o câmbio atualizado do Euro e Dolar no BNA 
const exchange = axios.create({
    baseURL: "https://bna.ao/service/rest/taxas"
});
export default exchange