import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import { initialCards } from "./constants.js";


const inputName = document.querySelector('.popup__input_type_name');
const inputProf = document.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const editForm = document.querySelector('.popup__edit-form');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__button-close');
const popupAdd = document.querySelector('.popup_type_add-pic');
const addButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.grid-photos');
const cardBigImage = document.querySelector('.grid-item__image');
const popupCardImage = document.querySelector('.popup__card-image');
const imageCaption = document.querySelector('.popup__image-caption');
const imagePopup = document.querySelector('.popup_type_image-big');


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
    reset(popupAdd);

}
addButton.addEventListener('click', openAddProfile);
// /open add popup
// add pic
const formAdd = document.querySelector('.popup__form-add');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink  = document.querySelector('.popup__input_type_link');


function addNewCard(data) {
  const card = new Card(data, '#card-template');
  const cardElement = card.generateCard();
  return cardElement;
};

const renderCard = (data, container) => {
  container.prepend(addNewCard(data))
}

initialCards.forEach((item) => {
  renderCard(item, cardsContainer);
});

///======== ADD NEW CARD =============



 function handleAddFormSumbit (evt) {
  evt.preventDefault();
  const name = inputPlace.value;
  const link = inputLink.value;
  const data = {name, link};
  renderCard(data, cardsContainer);
  evt.target.reset();

  // нужна функция отрисовки карточек (строка 48-51 не работает, но 51 строка полезна)
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
  reset(popupEdit);

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


const setPopupListener = (popup) => {
  keyDownEscape(popup);
 };



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


export {cardBigImage, popupCardImage, imageCaption, imagePopup, openPopup}
