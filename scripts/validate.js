const showInputError = (form , input , errMsg) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add("popup__input_type-error");
  error.textContent = errMsg;
  error.classList.add("popup__input-error_active");
};

const hideInputError = (form , input) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove("popup__input_type-error");
  error.classList.remove("popup__input-error_active");
  error.textContent = "";
};

const checkInputValid = (form , input) => {
  if (!input.validity.valid) {
    showInputError(form , input , input.validationMessage);
  } else {
    hideInputError(form , input);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList , button) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    button.classList.add("popup__save-button_inactive");
  } else {
    button.classList.remove("popup__save-button_inactive");
  }
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".popup__save-button");

  toggleButtonState(inputList , button);

  inputList.forEach((input) => {
    input.addEventListener("input" , () => {
      checkInputValid(form , input);
      toggleButtonState(inputList , button);
    });
  });

};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((form) => {
    form.addEventListener("submit" , (evt) => {
      evt.preventDefault();
    });

    setEventListeners(form);

  });
};