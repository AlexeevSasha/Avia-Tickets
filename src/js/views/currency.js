class CurrencyUi {
    constructor() {
        this.currency = document.getElementById('currency')
    }

    get currencyValue() {
        return this.currency.value;
    }
}

const currencyUi = new CurrencyUi();

export default currencyUi;