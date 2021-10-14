import api from "./services/apiService";

api.countries().then(res => console.log(res))