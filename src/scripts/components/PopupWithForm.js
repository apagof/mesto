import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, {submitFormHandler} ) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._saveButton = this._popup.querySelector('.popup__button-save');
  };

  _getInputValues() {
    this._inputValues = {};

      this._inputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;

  };

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues(), this._itemId, this._card);
    });
  };

  waitSubmitButton() {
    this._saveButton.textConent = "Сохранение...";
    this._saveButton.disabled = true;
  }

  resetWaitSubmitButton() {
    this._saveButton.disabled = false;
    this._saveButton.textConent = 'Сохранить';
  }

  open(itemId, card) {
    super.open();
    this._itemId = itemId;
    this._card = card;
  }

  close() {
    super.close();
    this._form.reset();
  };

};
