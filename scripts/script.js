const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const inputName = document.querySelector('.popup__input_type_name');
const inputProf = document.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const form = document.querySelector('.popup__form');

// open and close popups
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__button-close');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
// /open and close popups
// open edit popup
const popupEdit = document.querySelector('.popup__edit');
const editButton = document.querySelector('.profile__edit-button');

const OpenPopupProfile = () => {
  inputName.value = profileName.textContent;
  inputProf.value = profileJob.textContent;
  openPopup(popupEdit);
};
editButton.addEventListener('click', OpenPopupProfile);
//  /open edit popup
// open add popup
const popupAdd = document.querySelector('.popup__add-pic');
const addButton = document.querySelector('.profile__add-button');

const OpenAddProfile = () => {
    openPopup(popupAdd);
}
addButton.addEventListener('click', OpenAddProfile);
// /open add popup
// submit info edit profile
function handleFormSubmit(evt) {

    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputProf.value;
    closePopup (popupEdit);
}

form.addEventListener('submit', handleFormSubmit);
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
// card.querySelector('.grid-item__image').addEventListener('click', openPopupImage);

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
