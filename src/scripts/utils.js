const popupCardImage = document.querySelector('.popup__card-image');
const imageCaption = document.querySelector('.popup__image-caption');
const imagePopup = document.querySelector('.popup_type_image-big');


// function keyDownEscape(evt) {
//   const activePopup = document.querySelector('.popup_opened');
//   if (evt.key === isEscape) {
//    closePopup(activePopup);
// };
// }
// const closePopup = (popup) => {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', keyDownEscape); // удаление слушателя закрытия по Escape
// };

// const openPopup = (popup) => {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', keyDownEscape); // слушатель закрытия по Escape
// };

export {popupCardImage, imageCaption, imagePopup}
