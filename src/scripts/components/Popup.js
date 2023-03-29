export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._isEscape = 'Escape';
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
    this._closeButton = this._popup.querySelector('.popup__button-close');
    this._submitButton = this._popup.querySelector('.popup__button-save');
  };

  _handleEscClose = (evt) => {
    if (evt.key === this._isEscape) {
      this.close();
  };
};

_closePopupByClick = (evt) => {
  const activePopup = evt.target;
    if (activePopup === evt.currentTarget) {
        this.close();
  }
};

open() {
  this._popup.classList.add('popup_opened');
  document.addEventListener('keydown', this._handleEscClose);
  this._popup.addEventListener('click', this._closePopupByClick);
};

close() {
  this._popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', this._handleEscClose);
  this._popup.removeEventListener('click', this._closePopupByClick);
}

setEventListeners() {

  this._closeButton.addEventListener('click', () => {
    this.close();
  });
  this._popup.addEventListener('click', this._closePopupByClick);
};
};

