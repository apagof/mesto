import {Card} from "../scripts/components/Card.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {formValidationConfig, inputName, inputProf, editForm, addButton, cardsContainer, formAdd, profileName, profileJob, profileAvatar, popupAvatarInput, editAvatarButton, popupFormAdd} from "../scripts/utils/constants.js";
import "./index.css";
import {Section} from "../scripts/components/Section.js";
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {UserInfo} from '../scripts/components/Userinfo.js';
import {API} from '../scripts/components/API.js';
import { PopupWithConfirm } from "../scripts/components/PopupWithConfirm.js";

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

const popupDeleteConfirmation = new PopupWithConfirm ('.popup_type_confirm',
{
submitFormHandler: (itemId, card) => {
  popupDeleteConfirmation.waitSubmitButton();

  api.deleteCard(itemId)
  .then(() => {
    card.rmeoveCard();
    popupDeleteConfirmation.close();
  })
  .catch((err) => {
    `Ошибка: ${err}`
  })
  .finally(() => {
    popupDeleteConfirmation.resetWaitSubmitButton();
  })
}
});
popupDeleteConfirmation.setEventListeners();

// add new Card
  function addNewCard(item) {
    const card = new Card
(
     item, userId, '#card-template',
     () => handleCardClick(item.name, item.link),
     () => putLike(item, card),
     () => removeLike(item, card),
     () => popupConfirm(item._id, card),
);
const cardElement = card.generateCard(item._id);
return cardElement;
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
    const cardElement = addNewCard(item);
    cardSection.addItem(cardElement);
    },
}, cardsContainer
);

cardSection.renderItems();

// function putLike(item, card) {
//   api.likeCard(item._id)
//   .then((res) => {
//     card.likeCount(res);
//     card.likeActive();
//   })
//   .catch(err => console.log(`Ошибка: ${err}`));
// }

// function removeLike(item, card) {
//   api.unlikeCard(item._id)
//   .then((res) => {
//     card.likeCount(res);
//     card.disLike();
//   })
//   .catch(err => console.log(`Ошибка: ${err}`));
// }


function handleCardClick (name, link)  {
  const data = {name: name, link: link}
   openBigImage.open(data)
}


const popupEditAvatar = new PopupWithForm('.popup_type_avatar',
{
  submitFormHandler: (formData) => {
    userInfo.setUserInfo(formData);
    Promise.all([formData, api.editAvatar(formData), popupEditAvatar.waitSubmitButton()])
    .then((data) => {
      popupEditAvatar.close();
      popupEditAvatar.resetWaitSubmitButton();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }});
  popupEditAvatar.setEventListeners();

const popupEdit = new PopupWithForm('.popup_type_edit',
{
  submitFormHandler: (formData) => {
    userInfo.setUserInfo(formData);
    Promise.all([formData, api.editUserInfo(formData), popupEdit.waitSubmitButton()])
    .then((data) => {
    popupEdit.close();
    popupEdit.resetWaitSubmitButton();
  })
  .catch((error) => {
    console.log(`Ошибка: ${err}`)
  })
}
});


// add Card
const popupAddPlace = new PopupWithForm('.popup_type_add-pic',
{
  submitFormHandler: (formData) => {
    popupAddPlace.waitSubmitButton();
    api.addCard(formData)
    .then((data) => {
      cardSection.renderItem((data))
      popupAddPlace.close();
      placeValidation._disableButton();
    })
    .catch(error => console.log(error))
    .finally(() => {
      popupAddPlace.resetWaitSubmitButton();
    })
    }
});
popupAddPlace.setEventListeners();

function popupConfirm(itemId, card) {
  popupDeleteConfirmation.open();
  popupDeleteConfirmation.setItemData(itemId, card);
}

// open avatar popup
const openAvatarPopup = () => {
  popupEditAvatar.open();
  editValidation.reset();
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

addButton.addEventListener('click', openAddPopup);
editButton.addEventListener('click', openPopupProfile);
popupEdit.setEventListeners();
openBigImage.setEventListeners();
editAvatarButton.addEventListener('click', openAvatarPopup)

// Валидация
const profileValidation = new FormValidator(formValidationConfig, editForm);
profileValidation.enableValidation();

const placeValidation = new FormValidator(formValidationConfig, formAdd);
placeValidation.enableValidation();

const editValidation = new FormValidator(formValidationConfig, popupFormAdd);
editValidation.enableValidation();

// Promise ALL
Promise.all([api.getUserInfo(), api.getCards])
  .then((data) => {
    profileName.textContent = data[0].name;
    profileJob.textContent = data[0].about;
    profileAvatar.src = data[0].avatar;
    userId = data[0]._id;
    cardSection.renderItems(cardSection.setItems(data[1].reverse()));
  })
  .catch((err) => {
    `Ошибка: ${err}`
  });


