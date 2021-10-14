import axios from 'axios';
import config from '../config/apiConfig';



// class с набором методов для взаимодействия с нашим сервером
class Api {
    constructor(config) {
        this.url = config.url;
    }

    /**
     * /countries - возвращает массив стран
     * /cities - возвращает массив городов
     * /prices/cheap - возвращает массив с доступными рейсами
    */

    async countries() {
        try {
            const response = await axios.get(`${this.url}/countries`)
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    async cities() {
        try {
            const response = await axios.get(`${this.url}/cities`)
            return response.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    async prices(params) {}
}

const api = new Api(config);

export default api;