import {Card} from "../scripts/components/Card.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {formValidationConfig, inputName, inputProf, editForm, addButton, cardsContainer, formAdd, profileName, profileJob, profileAvatar} from "../scripts/utils/constants.js";
import "./index.css";
import {Section} from "../scripts/components/Section.js";
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {UserInfo} from '../scripts/components/Userinfo.js';
import {API} from '../scripts/components/API.js';


const api = new API({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '9144373c-04cd-49fd-a484-74e2aad42f33',
    'Content-Type': 'application/json'
  }
});
let userId;
const userInfo = new UserInfo('.profile__name', '.profile__profession');
const editButton = document.querySelector('.profile__edit-button');
const openBigImage = new PopupWithImage('.popup_type_image-big');
const popupEdit = new PopupWithForm('.popup_type_edit', {
  submitFormHandler: (formData) => {
    userInfo.setUserInfo(formData);
    popupEdit.close();
    resetWaitSubmitButton();
  }
});

api.getUserInfo()
  .then(data => {
    profileName.textContent = data.name;
    profileJob.textContent = data.about;
    profileAvatar.src = data.avatar;
  })
  .catch((err) => {
    console.log(err);
  })

// add new Card
function renderNewCard(item) {
  const card = new Card
  (
    item, '#card-template',
    () => handleCardClick(item.name, item.link), userId,
    () => deleteCardApi(item._id),
    () => isLiked(item._id, item)
  )
  const cardElement = card.generateCard();
  return cardElement;
}

function deleteCardApi(cardId) {
  api.deleteCard(cardId);
}

function isLiked(cardId, item) {
  if (item.likes.find((element) => (userId === element._id))) {
    api.unlikeCard(cardId);
  } else {
    api.likeCard(cardId);
  }
}
function handleCardClick (name, link)  {
  const data = {name: name, link: link}
   openBigImage.open(data)
}

const cardSection = new Section({
  items: api.getCards()
.then((result) => {
  return result.reverse();
  })
.catch((err) => {
    console.log(err);
  }),
  renderer: (item) => {
    const cardElement = renderNewCard(item)
    cardSection.addItem(cardElement);
    },
}, cardsContainer
);

cardSection.renderItems();

// add Card
const popupAddPlace = new PopupWithForm('.popup_type_add-pic',
{
  submitFormHandler: (formData) => {
    Promise.all([api.getUserInfo, api.addCard(formData), popupAddPlace(waitSubmitButton())])
    .then((data) => {
      Promise.all([cardSection.renderItem(data[1])])
    })
    .then((data) => {
      popupAddPlace.close();
      popupAddPlace.resetWaitSubmitButton();
      placeValidation._disableButton();
    })
    .catch(error => console.log(error));
    }
});
popupAddPlace.setEventListeners();

const formEditAvatarSubmitHandler = (event) => {
  event.preventDefault();

  avatarImage.src = popupAvatarInput.value;
  popupEditAvatar.waitSubmitButton();

  api.editUserAvatar(popupAvatarInput.value)
    .finally(() => {
      popupEditAvatar.close();
    });
}

const formDeleteSubmitHandler = (event, card) => {
  event.preventDefault();

  popupConfirm.waitSubmitButton('Удаление...');
  api.deleteCard(card.getIdCard())
    .then(response => {
      card.deleteCard();
    }).finally(() => {
      popupConfirm.close();
      popupConfirm.resetWaitSubmitButton();
    })
}

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

// Promise ALL
Promise.all([api.getUserInfo, api.getCards])
  .then((data) => {
    profileName.textContent = data[0].name;
    profileJob.textContent = data[0].about;
    profileAvatar.src = data[0].avatar;
    userId = data[0]._id;

    CardSection.getItems();

  })
  .catch((err) => {
    `Ошибка: ${err}`
  });
