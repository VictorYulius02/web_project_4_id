import Popup from "./Popup.js";

class PopupWithForms extends Popup {
  constructor(popupSelector , formSubmitData) {
    super(popupSelector);
    this._formSubmitData = formSubmitData;
    this._formElement = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputs = this._formElement.querySelectorAll('.popup__input');

    const inputValues = {};

    inputs.forEach(input => {
      inputValues[input.name] = input.value;
    })

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit' , (event) => {
      event.preventDefault();

      const formInputValues = this._getInputValues();
      
      this._formSubmitData(formInputValues);
    })
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForms;