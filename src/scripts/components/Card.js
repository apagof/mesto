
export class Card {
  constructor(data, templateSelector, handleCardClick, deleteCardApi, userId, isLiked) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCardApi = deleteCardApi;
    this._cardId = data._id;
    this._countLikes = data.likes;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._popupConfirm = document.querySelector('.popup_type_confirm');
    this._confirmDeleteButton = this._popupConfirm.querySelector('.popup__confirm_button-save');
    this._isLiked = isLiked;
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

  if (this._userId !== this._ownerId) {
  this._element.querySelector('.grid-item__delete-btn').remove();
}
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

_rmeoveCard() {
  this._deleteCardApi(this._cardId);
  this._element.remove();
}

_openConfirmPopup() {
  this._popupConfirm.classList.add('.popup_opened');
}
_closeConfirmPopup() {
  this._popupConfirm.classList.remove('.popup_opened');
}

 //  // pics from JS
_setEventListeners() {
  this._likeButton.addEventListener('click', () => {this._isLiked();
    if (this._likeButton.classList.contains('grid-item__like_active')) {
      this.disLike();
    } else {
      this.likeActive()
    }
  });
  this._deleteButton.addEventListener('click', () => {this._openConfirmPopup();
    this._confirmDeleteButton.addEventListener('click', () => {
      this._removeCard();
      this._closeConfirmPopup();
    });
  });

  this._image.addEventListener('click', () => this._handleCardClick());
}

}
