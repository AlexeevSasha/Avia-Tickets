import '../css/style.css'
import './plugins'
import locations from './store/locations';
import formUi from './views/form';


document.addEventListener('DOMContentLoaded', () => {
  initApp();

  // events

  // handler
  async function initApp() {
    await locations.init();
    formUi.setAutocompleteData(locations.shortCitiesList)
  }
})
