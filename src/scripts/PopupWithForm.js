import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, {submitFormHandler} ) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
  };

  _getInputs() {
    this._inputValues = {};

      this._inputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;

  };
  setEventListeners() {

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputs());
    });
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('click', this._closePopupByClick);
  };

  close() {
    super.close();
    this._form.reset();
  };
};
