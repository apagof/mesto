const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClass: 'popup__input-error'
}

function disableSubmit (event) {
  event.preventDefault();
}

function enableValidation(config) {
  const form = document.querySelector(config.formSelector);

  form.addEventListener('submit', disableSubmit);

  addInputListeners(form, config);
}

function handleAddFormInput(event, config) {
  const input = event.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);
  console.log(errorElement);

   if (input.validity.valid) {
    input.classList.remove(config.errorClass);
    errorElement.textContent='';
   } else {
    input.classList.add(config.errorClass);
    errorElement.textContent = input.validationMessage;
   }
}

function addInputListeners(form, config) {
  const inputList = Array.from(document.querySelectorAll(config.inputSelector));

  inputList.forEach(function (item) {
    item.addEventListener('input', (event) => {
      handleAddFormInput(event, config)
    });
    console.log(inputList);
  });
}

enableValidation(formValidationConfig);
