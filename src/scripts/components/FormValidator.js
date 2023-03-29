export class FormValidator {
  // Вынос элементов формы в константы
  constructor(validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._formInput = validationConfig.inputSelector;
    this._buttonSelector = validationConfig.buttonSelector;
    this._popupError = validationConfig.errorClass;
    this._inactiveButton = validationConfig.inactiveButtonClass;
    this._inputError = validationConfig.inputErrorClass;
    this._formElement = formElement;
    this._inputElements = this._formElement.querySelectorAll(this._formInput);
  }
  // Добавляем класс с ошибкой
  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._popupError);
    inputElement.classList.add(this._inputError);
  }

  // Удаляем класс с ошибкой
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    this._errorElement.classList.remove(this._popupError);
    inputElement.classList.remove(this._inputError);
    this._errorElement.textContent = "";
  }

  // Проверяем валидность поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _disableButton() {
    this._formElement
      .querySelector(this._buttonSelector)
      .classList.add(this._inactiveButton);
    this._formElement
      .querySelector(this._buttonSelector)
      .setAttribute("disabled", true);
  }

  // Включаем / отключаем кнопку
  _toggleButtonState() {
    this._submitButton = this._formElement.querySelector(this._buttonSelector);
    if (!this._formElement.checkValidity()) {
      this._disableButton();
    } else {
      this._formElement
        .querySelector(this._buttonSelector)
        .classList.remove(this._inactiveButton);
      this._formElement
        .querySelector(this._buttonSelector)
        .removeAttribute("disabled", false);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._formElement
      .querySelectorAll(this._formInput)
      .forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._isValid(inputElement);
          this._toggleButtonState();
        });
      });
  }

  enableValidation() {
    this._setEventListeners();
  }

  reset() {
    this._toggleButtonState();

    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
