export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  };

  open() {
    this._popup.classList.add('.popup_opened');
    document.addEventListener('keydown', this._keyDownEscape);
  };

  close() {
    this._popup.classList.remove('.popup_opened');
    document.removeEventListener('keydown', this._keyDownEscape); // удаление слушателя закрытия по Escape
  }

  _keyDownEscape(evt) {
    if (evt.key === this._isEscape) {
     this._close(this._selector);
  };
};

_closePopupByClick = (evt) => {
  const activePopup = evt.target;
    if (activePopup === evt.currentTarget) {
        this._close(this._popup);
  }
};

_setEvebtListeners() {
  this._isEscape = 'Escape';
  this._closeButton = document.querySelector('.popup__button-close');
  this._inputs = document.querySelectorAll('.popup__input');
  this._form = document.querySelector('.popup__form');

  this._closeButton.addEventListener('click', () => {
    this._close;
  });

  this._popup.addEventListener('click', this._closePopupByClick);
};
};

