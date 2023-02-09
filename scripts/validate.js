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
const showInputError = (formElement, inputElement, errorMessage, popupError, inputError) => {

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(popupError);
  inputElement.classList.add(inputError);
  };

// Удаляем класс с ошибкой
const hideInputError = (formElement, inputElement, popupError, inputError) => {

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.classList.remove(popupError);
  inputElement.classList.remove(inputError);
  errorElement.textContent = '';
};
// Проверяем валидность поля
const isValid = (formElement, inputElement, popupError, inputError) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, popupError, inputError);

  } else {
    hideInputError(formElement, inputElement, popupError, inputError);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


// Включаем / отключаем кнопку
const toggleButtonState = (inputList, buttonElements, obj) => {

   console.log(buttonElements);

    buttonElements.forEach((button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(obj['inactiveButtonClass']);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(obj['inactiveButtonClass']);
    button.removeAttribute('disabled', false);
  }
});
};
//  функция сброса валидации

const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj['inputSelector']));
  const buttonElements = Array.from(formElement.querySelectorAll(obj['buttonSelector']));



  toggleButtonState(inputList, buttonElements, obj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputError, popupError);
      toggleButtonState(inputList, buttonElements, obj);
    });
  });
};

const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj['formSelector']));

    formList.forEach((formElement) => {
      setEventListeners(formElement, obj);
    });
};


// Сбрасываем формы
const reset = (popup, obj) => {

  const form = popup.querySelector(formValidationConfig.formSelector);
  const buttonElement = popup.querySelector(formValidationConfig.buttonSelector);
  const spanError = popup.querySelectorAll(formValidationConfig.errorClass);
  const inputs = popup.querySelectorAll(formValidationConfig.inputSelector);

  if (popup.classList.contains('popup_type_edit')) {
    buttonElement.classList.remove((formValidationConfig.inactiveButtonClass));
    buttonElement.removeAttribute('disabled', false);
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
      buttonElement.setAttribute('disabled', true);
    }
  });

};

enableValidation(formValidationConfig);


