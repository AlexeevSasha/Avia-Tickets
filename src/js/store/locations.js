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
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);

        return response;
    }


    // [{}, {}] так выглядят наши данные с сервера
    // { 'City, Country', null } в таком формате получает данные наш     Autocomplete;

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


    //получение городов по коду страны
    getCitiesByCountryCode(code) {
        return this.cities.filter(city => city.country_code === code);
    }
}

const locations = new Locations(api);

export default locations;


