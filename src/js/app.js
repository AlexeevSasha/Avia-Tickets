import '../css/style.css'
import './plugins'
import locations from './store/locations';
import formUi from './views/form';
import currencyUi from './views/currency'
import ticketsUi from './views/tickets'


document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUi._form;

  // events
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  })

  // handler
  async function initApp() {
    await locations.init();
    formUi.setAutocompleteData(locations.shortCities)
  }

  //запрос на получение билетов
  async function onFormSubmit() {
    // собираем данные из инпутов
    // данные нужно преобразовать в -> code - code - 2019-09 - 2019-10
    const origin = locations.getCityCodeByKey(formUi.originValue);
    const destination = locations.getCityCodeByKey(formUi.destinationValue);
    const depart_date = formUi.departDateValue;
    const return_date = formUi.returnDateValue;
    const currency = currencyUi.currencyValue;

    await locations.fetchTickets( {
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUi.renderTickets(locations.lastSearch)
  }
})
