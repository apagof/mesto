
export class Card {
  constructor(data, userId, templateSelector, handleCardClick, deleteCardApi, popupConfirm) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCardApi = deleteCardApi;
    this._cardId = data._id;
    this._countLikes = data.likes;
    // this._myId = myId;
    this._userId = userId;
    this._ownerId = data.owner._id;
    // this._popupConfirm = document.querySelector('.popup_type_confirm');
    this._popupConfirm = popupConfirm;
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
  this._numberLikes = this._element.querySelector('.grid-item__like-counter');

  this._image.src = this._link; // присваиваем  ссылку
  this._cardName.textContent = this._name; // присваиваем  имя
  this._image.alt = this._name;
  this._counter = (this._countLikes).length;
  this._numberLikes.textContent = (this._countLikes).length;
  this._setEventListeners();

 if (this._ownerId === this._userId) {
  this._deleteButton.addEventListener('click', () => {
    this._popupConfirm();
 });
}
   else {
  this._deleteButton.remove();
 }
 console.log(this._userId);
  if (this._countLikes.find((element) => (this._userId === element._id))) {
    this._likeButton.classList.add('.grid-item__like_active');
  } else {
    this._likeButton.classList.remove('.grid-item__like_active');
  }
return this._element;
};

likeActive() {
  this._likeButton.classList.add('grid-item__like_active');
  this._counter = this._counter + 1;
  this._numberLikes.textContent = this._counter;
}

disLike() {
  this._likeButton.classList.remove('grid-item__like_active');
  this._counter = this._counter - 1;
  this._numberLikes.textContent = this._counter;
}

rmeoveCard() {
  this._deleteCardApi(this._cardId);
  this._element.remove();
}

getIdCard() {
  return this._cardId;
}
getOwnerId() {
  return this._ownerId;
 }

 getUserId() {
  return this._userId;
 }

 //  // pics from JS
_setEventListeners() {
  this._likeButton.addEventListener('click', () => {
    if (this._likeButton.classList.contains('grid-item__like_active')) {
      this.disLike();
    } else {
      this.likeActive()
    }
  });

  this._image.addEventListener('click', () => this._handleCardClick());
}

}
