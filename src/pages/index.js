import {Card} from "../scripts/components/Card.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {formValidationConfig, inputName, inputProf, editForm, addButton, cardsContainer, inputPlace, inputLink, formAdd} from "../scripts/utils/constants.js";
import "./index.css";
import {Section} from "../scripts/components/Section.js";
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {UserInfo} from '../scripts/components/Userinfo.js';
import {API} from '../scripts/components/API.js';

const api = new API({
  url: 'https://mesto.nomoreparties.co/v1/cohort-62/cards',
  headers: {
    authorization: '9144373c-04cd-49fd-a484-74e2aad42f33',
    'Content-Type': 'application/json'
  }
});

function getData() {
  fetch('https://nomoreparties.co/v1/cohortId/users/me', {
    method: 'GET',
    headers: {
      authorization: '9144373c-04cd-49fd-a484-74e2aad42f33'
    }
    .then (res => console.log(res))
  })

}

const userInfo = new UserInfo('.profile__name', '.profile__profession');
const editButton = document.querySelector('.profile__edit-button');
const openBigImage = new PopupWithImage('.popup_type_image-big');
const popupEdit = new PopupWithForm('.popup_type_edit', {
  submitFormHandler: (formData) => {
    userInfo.setUserInfo(formData);
    popupEdit.close();
  }
});

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = addNewCard(item)
    cardSection.addItem(cardElement);

  },
}, cardsContainer
);

cardSection.renderItems();

// add new Card
function addNewCard(item) {
  const card = new Card(item, '#card-template',
  () => handleCardClick(item.name, item.link));

  return card.generateCard();

};

function handleCardClick(name, link) {
  const data = {name: name, link: link}
  openBigImage.open(data)
}

// add Card
const popupAddPlace = new PopupWithForm('.popup_type_add-pic',
{ submitFormHandler: (formData) => {

    cardSection.renderItem(formData);
    popupAddPlace.close();

  }
});

// open profile popup
const openPopupProfile = () => {

  const infoUser = userInfo.getUserInfo();

  inputName.value = infoUser.name;
  inputProf.value = infoUser.profession;
  popupEdit.open()
  profileValidation.reset();
};


// open add popup
const openAddPopup = () => {
  placeValidation.reset();
  popupAddPlace.open();
}

popupAddPlace.setEventListeners();
addButton.addEventListener('click', openAddPopup);
editButton.addEventListener('click', openPopupProfile);
popupEdit.setEventListeners();
openBigImage.setEventListeners();

// Валидация
const profileValidation = new FormValidator(formValidationConfig, editForm);
profileValidation.enableValidation();

const placeValidation = new FormValidator(formValidationConfig, formAdd);
placeValidation.enableValidation();
