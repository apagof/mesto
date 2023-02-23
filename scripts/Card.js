import {popupCardImage, imageCaption, imagePopup, openPopup} from "./index.js";

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  };

  _getTemplate() {
    const cardElement = document
    .querySelector("#card-template")
    .content
    .querySelector('.grid-item')
    .cloneNode(true);

  return cardElement;
 };


generateCard() {
  this._element = this._getTemplate();


  this._element.querySelector('.grid-item__image').src = this._link; // присваиваем  ссылку
  this._element.querySelector('.grid-item__image').alt = this._name;
  this._element.querySelector('.grid-item__name').textContent = this._name; // присваиваем  имя
  this._setEventListeners();

  return this._element;
};
 //  // pics from JS

//
_setEventListeners() {
  this._element.querySelector('.grid-item__like').addEventListener('click', () => { this._likeCard()});
  this._element.querySelector('.grid-item__delete-btn').addEventListener('click', () => { this._removeCard()});
  this._element.querySelector('.grid-item__image').addEventListener('click', () => {this._openBigImage(this._name, this._link)});
}

// add like button
_likeCard() {
  this._element.querySelector('.grid-item__like').classList.toggle('grid-item__like_active');
}
// /add like button
// remove card
_removeCard() {
  const card = this._element.querySelector('.grid-item__delete-btn').closest('.grid-item');
  card.remove();
};
// /remove card

//  open big image
_openBigImage() {
  popupCardImage.src = this._link;
  popupCardImage.alt = this._name;
  imageCaption.textContent = this._name;
  openPopup(imagePopup);
}

// /open big image

}
