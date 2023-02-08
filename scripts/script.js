



const inputName = document.querySelector('.popup__input_type_name');
const inputProf = document.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const editForm = document.querySelector('.popup__edit-form');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__button-close');
const popupAdd = document.querySelector('.popup_type_add-pic');
const addButton = document.querySelector('.profile__add-button');

// open and close popups
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyDownEscape); // слушатель закрытия по Escape
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyDownEscape); // удаление слушателя закрытия по Escape
};


closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// /open and close popups
// open add popup

const openAddProfile = () => {
    openPopup(popupAdd);
}
addButton.addEventListener('click', openAddProfile);
// /open add popup
// add pic
const formAdd = document.querySelector('.popup__form-add');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink  = document.querySelector('.popup__input_type_link');

 const addNewCard = () => {
  const name = inputPlace.value;
  const link = inputLink.value;
  cardsContainer.prepend(cardElement(name, link));
 }

 function handleAddFormSumbit (evt) {
  evt.preventDefault();
  addNewCard();
  closePopup(popupAdd);
  formAdd.reset();
 }

formAdd.addEventListener('submit', handleAddFormSumbit);

// /add pic
// open edit popup
const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');

const openPopupProfile = () => {
  inputName.value = profileName.textContent;
  inputProf.value = profileJob.textContent;
  openPopup(popupEdit);
};
editButton.addEventListener('click', openPopupProfile);
//  /open edit popup

// submit info edit profile
function submitEditPopup(evt) {

    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputProf.value;
    closePopup (popupEdit);
}

editForm.addEventListener('submit', submitEditPopup);

// /submit info edit profile
// add like button
const likeCard = (e) => {
  e.target.classList.toggle('grid-item__like_active');
}
// /add like button
// remove card
const removeCard = (e) => {
  const card = e.target.closest('.grid-item');
  card.remove();
};
// /remove card

//  open big image
const cardBigImage = document.querySelector('.grid-item__image');
const popupCardImage = document.querySelector('.popup__card-image');
const imageCaption = document.querySelector('.popup__image-caption');
const imagePopup = document.querySelector('.popup_type_image-big');

const openBigImage = (e) => {
  popupCardImage.src = e.target.src;
  popupCardImage.alt = e.target.alt;
  imageCaption.textContent = e.target.alt;
  openPopup(imagePopup);
}

// /open big image
// pics from JS
const	cardsContainer = document.querySelector('.grid-photos');

const	cardTemplate = document.querySelector('#card-template').content; // получаем содержимое

const	cardElement = (name, link) => {
  const	card = cardTemplate.cloneNode(true); // клонируем содержимое

  card.querySelector('.grid-item__image').src = link; // присваиваем  ссылку
  card.querySelector('.grid-item__image').alt = name;
  card.querySelector('.grid-item__name').textContent = name; // присваиваем  имя

  card.querySelector('.grid-item__like').addEventListener('click', likeCard);
  card.querySelector('.grid-item__delete-btn').addEventListener('click', removeCard);
  card.querySelector('.grid-item__image').addEventListener('click', openBigImage);

return card;
};

function renderCards(cards) {
  for (let i = 0; i < cards.length; i++) {
    const createCard = cardElement(initialCards[i].name, initialCards[i].link);
    cardsContainer.append(createCard);
  }
}
renderCards(initialCards);
//  /pics from JS

const setPopupListener = (popup) => {
  keyDownEscape(popup);
 };

popups.forEach((popup) => {
  setPopupListener(popup);
});

// close by mouse
const closePopupByClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      popups.forEach((popup) => {
        closePopup(popup);
    });
  }
};
// /close by mouse
// close popup by esc

function keyDownEscape(evt) {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      closePopup(popup);
    });

};
}
// /close popup by esc
popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByClick);
});
