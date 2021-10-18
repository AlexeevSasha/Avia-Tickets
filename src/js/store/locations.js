import api from '../services/apiService'
import { formatDate } from '../helpers/date';
// Locations для хранение countries и cities
class Locations {
    constructor(api, helpers) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCities = {};
        this.lastSearch = {};
        this.airlines = {};
        this.formatDate = helpers.formatDate;
    }

    //запрашивает города и страны
    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines(),
        ]);

        const [countries, cities, airlines] = response;
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCities = this.createShortCities(this.cities);
        this.airlines = this.serializeAirlines(airlines);
        return response;
    }

    getCityCodeByKey(key) {
       const city = Object.values(this.cities).find(item => item.full_name === key);
       return city.code;
    }

    getCityNameByCode (code) {
        return this.cities[code].name
    }

    getAirlineNameByCode(code) {
        return this.airlines[code] ? this.airlines[code].name : '';
    }

    getAirlineLogoByCode(code) {
        return this.airlines[code] ? this.airlines[code].logo : '';
    }


    // [{}, {}] так выглядят наши данные с сервера
    // { 'City, Country', null } в таком формате получает данные наш     Autocomplete;
    createShortCities(cities) {
        //Object.entries -> [key, value]
        return Object.entries(cities).reduce((acc, [, city]) => {
              acc[city.full_name] = null;
              return acc;
        }, {})
    }

    //преобразуем в объект объектов и добавим logo
    serializeAirlines(airlines) {
        return airlines.reduce((acc, airline) => {
            airline.logo = `http://pics.avs.io/200/200/${airline.code}.png`;
            airline.name = airline.name || airline.name_translations.en;
            acc[airline.code] = airline;
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

    //преобразуем в формат { 'City.code': {...} }
    serializeCities(cities) {
        return cities.reduce((acc, city) => {
            const country_name = this.countries[city.country_code].name;
            city.name = city.name || city.name_translations.en;
            const full_name = `${city.name}, ${country_name}`
            acc[city.code] = {
                ...city,
                country_name,
                full_name,
            };
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
        this.lastSearch = this.serializeTickets(response.data);
    }

    // добавляем в объект code, logo, name
    serializeTickets(tickets) {
        return Object.values(tickets).map(ticket => {
            return {
                ...ticket,
                origin_name: this.getCityNameByCode(ticket.origin),
                destination_name: this.getCityNameByCode(ticket.destination),
                airline_logo: this.getAirlineLogoByCode(ticket.airline),
                airline_name: this.getAirlineNameByCode(ticket.airline),
                departure_at: this.formatDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
                return_at: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm'),
            }
        })
    }
}

const locations = new Locations(api, { formatDate });

export default locations;


