import Popup from './Popup.js'

 class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitFormHandler ) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button-save');
    this._submitButtonText = this._submitButton.value;
      }



setEventListeners() {
  this._form.addEventListener('submit', (event) => {
    this._submitFormHandler(event, this._parametr);
  });
  this._closeButton,addEventListener('click', () => {
    this.close();
  })
}

open(parametr) {
  this._parametr = parametr;
  super.open();
}

}
export default PopupWithSubmit;
