let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__button-close');
let editButton = document.querySelector('.profile__edit-button');
let inputName = document.querySelector('.popup__input_name');
let inputProf = document.querySelector('.popup__input_profession');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__profession');
let form = document.querySelector('.popup__form');

function popupOpened() {
    popup.classList.add('popup__opened');
    inputName.value = profileName.textContent;
    inputProf.value = profileJob.textContent;
}
editButton.addEventListener('click', popupOpened);


function closePopup() {
    inputName.value = profileName.textContent;
    inputProf.value = profileJob.textContent;
    popup.classList.remove('popup__opened');
}

closeButton.addEventListener('click', closePopup);

function handleFormSubmit(evt) {

    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputProf.value;
    closePopup();
}

form.addEventListener('submit', handleFormSubmit);
