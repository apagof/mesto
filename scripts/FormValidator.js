export class FormValidator {

// Вынос элементов формы в константы
constructor(data){

this._formElement = data.formSelector;
this._formInput = data.inputSelector;
this._formError = document.querySelector(`#${formInput.id}-error`);
this._buttonElement = data.buttonSelector;
this._popupError = data.errorClass;
this._inactiveButton = data.inactiveButtonClass;
this._inputError = data.inputErrorClass;
}

_disableSubmit (event) {
  event.preventDefault();
}

// Добавляем класс с ошибкой
_showInputError(formElement, inputElement, errorMessage, popupError, inputError) {

  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(popupError);
  inputElement.classList.add(inputError);
  };

// Удаляем класс с ошибкой
_hideInputError(formElement, inputElement, popupError, inputError){

  errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.classList.remove(popupError);
  inputElement.classList.remove(inputError);
  errorElement.textContent = '';
};
// Проверяем валидность поля
_isValid(formElement, inputElement, popupError, inputError) {
  if (!inputElement.validity.valid) {
    this._showInputError(formElement, inputElement, inputElement.validationMessage, popupError, inputError);

  } else {
    this._hideInputError(formElement, inputElement, popupError, inputError);
  }
};

_hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


// Включаем / отключаем кнопку
_toggleButtonStat(inputList, buttonElements, obj) {

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

_setEventListeners(formElement, obj) {
  this._inputList = Array.from(this._formElement.querySelectorAll(obj['inputSelector']));
  this._buttonElements = Array.from(this._formElement.querySelectorAll(obj['buttonSelector']));



  _toggleButtonState(this._inputList, this._buttonElements, obj);

  this._inputList.forEach((inputElement) => {
    this._inputElement.addEventListener('input', () => {
      _isValid(this._formElement, this._inputElement, this._inputError, this._popupError);
      _toggleButtonState(this._inputList, this._buttonElements, obj);
    });
  });
};

_enableValidation = (obj) => {
  this._formList = Array.from(document.querySelectorAll(obj['formSelector']));

  this._formList.forEach((formElement) => {
      _setEventListeners(formElement, obj);
    });
};


// Сбрасываем формы
_reset(popup, obj) {

  this._form = popup.querySelector(formValidationConfig.formSelector);
  this._buttonElement = popup.querySelector(formValidationConfig.buttonSelector);
  this._spanError = popup.querySelectorAll(formValidationConfig.errorClass);
  this._inputs = popup.querySelectorAll(formValidationConfig.inputSelector);

  if (popup.classList.contains('popup_type_edit')) {
    this._buttonElement.classList.remove((formValidationConfig.inactiveButtonClass));
    this._buttonElement.removeAttribute('disabled', false);
  };
  if (popup.classList.contains('popup_type_add-pic')) {
    this._form.reset();
  };
  spanError.forEach((item) => {
    item.textContent = '';
    item.classList.remove((formValidationConfig.inputErrorClass));
  });
  inputs.forEach((input) => {
    input.classList.remove('popup__input_type_error');
    if (input.value == '') {
      this._buttonElement.classList.add((formValidationConfig.inactiveButtonClass));
      this._buttonElement.setAttribute('disabled', true);
    }
  });

};

_enableValidation() {
  this._setEventListeners();
};


}

