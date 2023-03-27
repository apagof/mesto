import Popup from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, {submitFormHandler}) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._saveButton = this._popup.querySelector('.popup__button-save');
  }

  setItemData(itemId, item) {
    this._itemId = itemId;
    this._item = item;
  }

  waitSubmitButton() {
    this._saveButton.textConent = "Сохранение...";
    this._saveButton.disabled = true;
  }

  resetWaitSubmitButton() {
    this._saveButton.disabled = false;
    this._saveButton.textConent = 'Сохранить';
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._itemId, this._item);
    });
  }
}
