const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  buttonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: '.popup__input-error_active'
}


function enableValidation(config) {
   const form = document.querySelector(config.formSelector);
   addInputListeners(config);

}

function handleFormInput(event, config) {
    const input = event.target;
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`); // объявляем спаны


// добавляем / убираем текст ошибки

    if (input.validity.valid) {
      input.classList.remove(config.errorClass);
      errorElement.textContent='';
    } else {
      input.classList.add(config.errorClass);
      errorElement.textContent = input.validationMessage;
      };

}
// /добавляем / убираем текст ошибки
function showInputError (formElement, inputElement, errorMessage) {
  inputElement.classList.add(formValidationConfig.errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formValidationConfig.inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
}

function addInputListeners(config) {
  const inputList = document.querySelectorAll(config.inputSelector);

  inputList.forEach(function (item) {
     item.addEventListener('input', (event) => {
      handleFormInput(event, config)
      console.log(handleFormInput(event, config));
     });
  });

}

    function submitAvailable(config) {

     const inactiveButton = document.querySelector(config.inactiveButtonClass);
     const submitButton = Array.from(document.querySelectorAll(config.buttonSelector));

      submitButton.forEach((input) => {

    if (input.validity.valid) {
      submitButton.classList.remove(inactiveButton);

   } else {
      submitButton.disabled;
      submitButton.classList.add(inactiveButton);
    }
    submitAvailable();

  });

  console.log(submitButton);
};

enableValidation(formValidationConfig);


