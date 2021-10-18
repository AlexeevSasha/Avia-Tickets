import { getAutocompleteInstance, getDatepickerInstance } from "../plugins/materialize";

class FormUi {
    constructor(autocompleteInstance, datepickerInstance) {
        this._form = document.forms['locationControls'];
        this.origin = document.getElementById('autocomplete-origin');
        this.destination = document.getElementById('autocomplete-destination');
        this.depart = document.getElementById('datepicker-depart');
        this.return = document.getElementById('datepicker-return');
        this.originAutocomplete = autocompleteInstance(this.origin);
        this.destinationAutocomplete = autocompleteInstance(this.destination);
        this.departDatepicker = datepickerInstance(this.depart);
        this.returnDatepicker = datepickerInstance(this.return);
    }

    get form() {
        return this.$form;
    }

    // значение this.origin
    get originValue() {
        return this.origin.value;
    }
    // значение this.destination
    get destinationValue() {
        return this.destination.value;
    }
    // значение departDatepicker
    get departDateValue() {
        return this.departDatepicker.toString();
    }
    // значение returnDatepicker
    get returnDateValue() {
        return this.returnDatepicker.toString();
    }

    setAutocompleteData(data) {
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }
}

const formUi = new FormUi(getAutocompleteInstance, getDatepickerInstance);

export default formUi;