import {Card} from "../scripts/Card.js";
import {FormValidator} from "../scripts/FormValidator.js";
import {initialCards, formValidationConfig, inputName, inputProf, profileName,
  profileJob, editForm, popups, popupAdd, addButton, cardsContainer, formAdd} from "../scripts/constants.js";
import "./index.css";
import {Section} from "../scripts/Section.js";
import {PopupWithImage} from '../scripts/PopupWithImage.js';
import {PopupWithForm} from '../scripts/PopupWithForm.js';
import {UserInfo} from '../scripts/Userinfo.js';
import {Popup} from "../scripts/Popup.js";


const userInfo = new UserInfo('.profile__name', '.profile__profession');

const popupEdit = new PopupWithForm('.popup_type_edit', {
  submitFormHandler: (formData) => {
    userInfo.setUserInfo(formData);
    popupEdit.close();
  }
});

popupEdit.setEventListeners();

// open big image
const openBigImage = new PopupWithImage('.popup_type_image-big');
openBigImage.setEventListeners();


// add new Card
function addNewCard(item) {
  const card = new Card(item, '#card-template', () => handleCardClick(item.name, item.link));
  const cardElement = card.generateCard();
  return cardElement;
};

function handleCardClick(name, link) {
  const data = {name: name, link: link}
  openBigImage.open(data)
}

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = addNewCard(item)
    cardSection.addItem(cardElement);
  },
}, cardsContainer
);

cardSection.renderItems();

// add Card
const popupAddPlace = new PopupWithForm('.popup_type_add-pic',
{
  submitFormHandler: (formData) => {
    cardSection.renderItem(formData);
    popupAddPlace.close();
    placeValidation.disableButton();
  }
});

popupAddPlace.setEventListeners();

const editButton = document.querySelector('.profile__edit-button');

// open profile popup
const openPopupProfile = () => {
  const object = userInfo.getUserInfo();
  inputName.value = object.name;
  inputProf.value = object.description;
  popupEdit.open()
  profileValidation.reset();
};
editButton.addEventListener('click', openPopupProfile);

// open add popup
const openAddPopup = () => {
  placeValidation.reset();
  popupAddPlace.open();
}

addButton.addEventListener('click', openAddPopup);

// Валидация
const profileValidation = new FormValidator(formValidationConfig, editForm);
profileValidation.enableValidation();

const placeValidation = new FormValidator(formValidationConfig, formAdd);
placeValidation.enableValidation();


