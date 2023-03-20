
export class Card {
  constructor(data, templateSelector, handleCardClick, cardId, countLikes) {
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._place = data.name;
    this._cardId = cardId;
    this._countLikes = countLikes;
  };

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.grid-item')
    .cloneNode(true);

  return cardElement;
 };

generateCard() {
  this._element = this._getTemplate();
  this._cardName = this._element.querySelector('.grid-item__name');
  this._image = this._element.querySelector('.grid-item__image');
  this._likeButton = this._element.querySelector('.grid-item__like');
  this._deleteButton = this._element.querySelector('.grid-item__delete-btn');

  this._image.src = this._link; // присваиваем  ссылку
  this._cardName.textContent = this._place; // присваиваем  имя
  this._image.alt = this._place;
  this._setEventListeners();

  return this._element;

};

getIdCard() {
  return this._cardId;
}

 //  // pics from JS
//
_setEventListeners() {
  this._likeButton.addEventListener('click', () => this._likeCard());
  this._deleteButton.addEventListener('click', () => this._removeCard());
  this._image.addEventListener('click', () => this._handleCardClick());
}

renderLikes() {
  this._likes.textContent = this._countLikes.length;
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
}
