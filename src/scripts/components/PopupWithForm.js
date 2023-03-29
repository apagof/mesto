import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, {submitFormHandler} ) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._submitButton = this._popup.querySelector('.popup__button-save');
  };

  _getInputValues() {
    this._inputValues = {};

      this._inputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;

  };

  waitSubmitButton(text) {
    this._submitButton.textConent = text;
    this._submitButton.disabled = true;
  }

  resetWaitSubmitButton() {
    this._submitButton.textConent = 'Сохранить';
    this._submitButton.disabled = false;
  }

  close() {
    super.close();
    this._form.reset();
  };

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues(), this._itemId, this._card);
    });
  };

};
