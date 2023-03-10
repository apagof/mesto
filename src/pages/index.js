import {Card} from "../scripts/components/Card.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {initialCards, formValidationConfig, inputName, inputProf, editForm, addButton, cardsContainer, inputPlace, inputLink, formAdd} from "../scripts/utils/constants.js";
import "./index.css";
import {Section} from "../scripts/components/Section.js";
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {UserInfo} from '../scripts/components/Userinfo.js';

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
  () => handleCardClick(item.place, item.link));

  return card.generateCard();

};

function handleCardClick(place, link) {
  const data = {name: place, link: link}
  openBigImage.open(data)
}

// add Card
const popupAddPlace = new PopupWithForm('.popup_type_add-pic',
{ submitFormHandler: (formData) => {

    cardSection.renderItem(formData);
    console.log(formData);
    popupAddPlace.close();

  }
});

// open profile popup
const openPopupProfile = () => {

  const infoObject = userInfo.getUserInfo();

  inputName.value = infoObject.name;
  inputProf.value = infoObject.profession;
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

// ??????????????????
const profileValidation = new FormValidator(formValidationConfig, editForm);
profileValidation.enableValidation();

const placeValidation = new FormValidator(formValidationConfig, formAdd);
placeValidation.enableValidation();
