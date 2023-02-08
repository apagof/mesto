const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClass: 'popup__input-error',
  buttonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error'
}

function disableSubmit (event) {
  event.preventDefault();
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  const inputList = Array.from(document.querySelectorAll(config.inputSelector));

  forms.forEach(function(form) {
  form.addEventListener('submit', disableSubmit);
  form.addEventListener('input', () => {
    toggleButton(config, inputList);
  })
  addInputListeners(form, config);
 toggleButton(config, inputList);
});
}

function addInputListeners(forms, config) {
  const inputList = Array.from(forms.querySelectorAll(config.inputSelector));
  console.log(inputList);
  inputList.forEach(function(inputElement) {
    inputElement.addEventListener('input', (event) => {
      hasInvalidInput(inputList);
    });

  });
}

function handleAddFormInput(event, config) {
  const input = event.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);

   if (input.validity.valid) {
    input.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent='';

   } else {
    input.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
   }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});

};


function toggleButton(config, inputList) {

  const buttonSubmit = Array.from(document.querySelectorAll(config.buttonSelector));


  buttonSubmit.forEach(function(button) {
    if (hasInvalidInput(inputList)) {
      button.classList.add(config.inactiveButtonClass);

    } else {
      button.classList.remove(config.inactiveButtonClass);
    }
  });
 }



enableValidation(formValidationConfig);



