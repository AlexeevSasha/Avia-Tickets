import api from '../services/apiService'
// Locations для хранение countries и cities
class Locations {
    constructor(api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
    }

    //запрашивает города и страны
    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
        ]);

        const [countries, cities] = response;
        this.countries = countries;
        this.cities = cities;

        return response;
    }

    //получение городов по коду страны
    getCitiesByCountryCode(code) {
        return this.cities.filter(city => city.country_code === code);
    }
}

const locations = new Locations(api);

export default locations;
