import Popup from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, { submitFormHandler }) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
  }

  setItemData(itemId, item) {
    this._itemId = itemId;
    this._item = item;
  }

  waitSubmitButton() {
    this._submitButton.textConent = "Сохранение...";
    this._submitButton.disabled = true;
  }

  resetWaitSubmitButton() {
    this._submitButton.disabled = false;
    this._submitButton.textConent = "Сохранить";
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._itemId, this._item);
    });
  }
}
