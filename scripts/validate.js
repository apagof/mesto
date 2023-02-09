// Вынос элементов формы в константы
const formElement = document.querySelector(formValidationConfig.formSelector);
const formInput = document.querySelector(formValidationConfig.inputSelector);
const formError = document.querySelector(`#${formInput.id}-error`);
const buttonElement = document.querySelector(formValidationConfig.buttonSelector);
const popupError = document.querySelector(formValidationConfig.errorClass);
const inactiveButton = document.querySelector(formValidationConfig.inactiveButtonClass);
const inputError = document.querySelector(formValidationConfig.inputErrorClass);

function disableSubmit (event) {
  event.preventDefault();
}


// Добавляем класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(formValidationConfig.errorClass);
  inputElement.classList.add(formValidationConfig.inputErrorClass);
  };

// Удаляем класс с ошибкой
const hideInputError = (formElement, inputElement) => {

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.classList.remove(formValidationConfig.errorClass);
  inputElement.classList.remove(formValidationConfig.inputErrorClass);
  errorElement.textContent = '';
};
// Проверяем валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);

  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
// Включаем / отключаем кнопку
const toggleButtonState = (inputList, buttonElement) => {
    buttonElement.forEach((button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(formValidationConfig.inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(formValidationConfig.inactiveButtonClass);
    button.removeAttribute()
  }
});
};
//  функция сброса валидации

const setEventListeners = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll(formValidationConfig.inputSelector));
  const buttonElement = Array.from(document.querySelectorAll(formValidationConfig.buttonSelector));


  toggleButtonState(inputList, buttonElement, inactiveButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));


    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
};
// Сбрасываем формы
const reset = (popup) => {

  const form = popup.querySelector(formValidationConfig.formSelector);
  const buttonElement = popup.querySelector(formValidationConfig.buttonSelector);
  const spanError = popup.querySelectorAll(formValidationConfig.errorClass);
  const inputs = popup.querySelectorAll(formValidationConfig.inputSelector);

  if (popup.classList.contains('popup_type_edit')) {
    buttonElement.classList.remove((formValidationConfig.inactiveButtonClass));
  };
  if (popup.classList.contains('popup_type_add-pic')) {
    form.reset();
  };
  spanError.forEach((item) => {
    item.textContent = '';
    item.classList.remove((formValidationConfig.inputErrorClass));
  });
  inputs.forEach((input) => {
    input.classList.remove('popup__input_type_error');
    if (input.value == '') {
      buttonElement.classList.add((formValidationConfig.inactiveButtonClass));
    }
  });

};

enableValidation();
