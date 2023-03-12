import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupCardImage = document.querySelector('.popup__card-image');
    this._imageCapiton = document.querySelector('.popup__image-caption');
  };

  open(data) {
    super.open();

    this._popupCardImage.src = data.link;
    this._popupCardImage.alt = data.name;
    this._imageCapiton.textContent = data.name;

  }
};

// //  open big image
// _openBigImage() {
//   popupCardImage.src = this._link;
//   popupCardImage.alt = this._name;
//   imageCaption.textContent = this._name;
//   openPopup(imagePopup);
// }
// // /open big image
