import {Card} from "../scripts/Card.js";
import {FormValidator} from "../scripts/FormValidator.js";
import { initialCards, formValidationConfig } from "../scripts/constants.js";
import {popupCardImage, imageCaption, imagePopup} from "../scripts/utils.js";
import "./index.css";
import {Section} from "../scripts/Section.js";
import {Popup} from '../scripts/Popup.js';
import {PopupWithImage} from '../scripts/PopupWithImage.js';
import {PopupWithForm} from '../scripts/PopupWithForm.js';
import {UserInfo} from '../scripts/Userinfo.js';


const inputName = document.querySelector('.popup__input_type_name');
const inputProf = document.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const editForm = document.querySelector('.popup__edit-form');
const popups = document.querySelectorAll('.popup');

const popupAdd = document.querySelector('.popup_type_add-pic');
const addButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.grid-photos');
const cardBigImage = document.querySelector('.grid-item__image');
const formProfile = document.querySelector('.popup__form');
const formAdd = document.querySelector('.popup__form-add');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink  = document.querySelector('.popup__input_type_link');

// open and close popups
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
// /open and close popups
// open add popup
const openAddProfile = () => {
    openPopup(popupAdd);
    placeValidation.reset();
}
addButton.addEventListener('click', openAddProfile);
// /open add popup
// add pic

function addNewCard(validationConfig) {
  const card = new Card(validationConfig, '#card-template');
  const cardElement = card.generateCard();
  return cardElement;
};

const renderCard = (data, container) => {
  container.prepend(addNewCard(data))
}

initialCards.forEach((item) => {
  renderCard(item, cardsContainer);
});

 function handleAddFormSumbit (evt) {
  evt.preventDefault();
  const name = inputPlace.value;
  const link = inputLink.value;
  const data = {name, link};
  renderCard(data, cardsContainer);
  evt.target.reset();
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
  profileValidation.reset();
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
// // close by mouse
// const closePopupByClick = (evt) => {
//   const activePopup = evt.target;
//     if (activePopup === evt.currentTarget) {
//         closePopup(activePopup);
//   }
// };
// // /close by mouse
popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByClick);
});
// Валидация
const profileValidation = new FormValidator(formValidationConfig, editForm);
profileValidation.enableValidation();

const placeValidation = new FormValidator(formValidationConfig, formAdd);
placeValidation.enableValidation();

export {cardBigImage, popupCardImage, imageCaption, imagePopup}
