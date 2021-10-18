import api from '../services/apiService'
// Locations для хранение countries и cities
class Locations {
    constructor(api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
    }

    //запрашивает города и страны
    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
        ]);

        const [countries, cities] = response;
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);

        return response;
    }

    getCityCodeByKey(key) {
        return this.cities[key].code;
    }


    // [{}, {}] так выглядят наши данные с сервера
    // { 'City, Country', null } в таком формате получает данные наш     Autocomplete;
    createShortCitiesList(cities) {
        //Object.entries -> [key, value]
        return Object.entries(cities).reduce((acc, [key]) => {
              acc[key] = null;
              return acc;
        }, {})
    }

    //преобразуем в формат { 'Country-code': {...} }
    serializeCountries(countries) {
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {})
    }

    //преобразуем в формат { 'City name, Country name': {...} }
    serializeCities(cities) {
        return cities.reduce((acc, city) => {
            const country_name = this.getCountryNameByCode(city.country_code);
            const city_name = city.name || city.name_translations.en;
            const key = `${city_name}, ${country_name}`
            acc[key] = city;
            return acc;
        }, {})
    }

    //получаем name country
    getCountryNameByCode(code) {
        // this.countries содержит { 'Country-code': {...} }
        return this.countries[code].name;
    }

    async fetchTickets (params) {
        const response = await this.api.prices(params);
        console.log(response);
    }
}

const locations = new Locations(api);

export default locations;


