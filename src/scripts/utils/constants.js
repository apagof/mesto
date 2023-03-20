const inputName = document.querySelector('.popup__input_type_name');
const inputProf = document.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const editForm = document.querySelector('.popup__edit-form');
const popups = document.querySelectorAll('.popup');
const popupAdd = document.querySelector('.popup_type_add-pic');
const addButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.grid-photos');
const formAdd = document.querySelector('.popup__form-add');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const cardTemplate = '#card-template';
const popupConfirm = document.querySelector('.popup__confirm_header');



const formValidationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClass: 'popup__input-error_active',
  buttonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error'
});

export {formValidationConfig, inputName, inputProf, profileName, profileJob, inputPlace, editForm, popups, popupAdd, inputLink, addButton, cardsContainer, cardTemplate, formAdd, popupConfirm};
