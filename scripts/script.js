const editBtn = document.querySelector('.profile-info__edit-button');
const nameProfile = document.querySelector('.profile-info__name');
const jobProfile = document.querySelector('.profile-info__job');

const editPopup = document.querySelector('popup[name="editPopup"]');
const nameInput = document.querySelector('input[name="nameInput"]');
const jobInput = document.querySelector('input[name="jobInput"]');
const editPopupCloseButton = document.querySelector('button[name="editPopupCloseButton"]');

const likeBtn = document.querySelectorAll('.element__like-button');

const addBtn = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('popup[name="addPopup"]');
const titleInput = document.querySelector('input[name="titleInput"]');
const webAddressInput = document.querySelector('input[name="webAddressInput"]');
const addPopupCloseButton = document.querySelector('button[name="addPopupCloseButton"]');
const saveBtn = document.querySelector('button[name="addPopupSaveButton"]');
const titleErrorMsg = document.querySelector('span[name="titleErrorMsg"]');
const webAddressErrorMsg = document.querySelector('span[name="webAddressErrorMsg"]');

const elementTemplate = document.querySelector('.element-template');
const elements = document.querySelector('.elements');

const input = document.querySelector('popup__input');

const editOverlay = document.querySelector('div[name="editOverlay"]');
const addOverlay = document.querySelector('div[name="addOverlay"]');
const viewOverlay = document.querySelector('div[name="viewOverlay"]');

const initialCards = [
  {
    name: "Lembah Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Danau Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Pegunungan Gundul",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Gunung Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Taman Nasional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

function createTemplate() {
  while (elements.firstChild) {
    elements.firstChild.remove();
  }

  initialCards.forEach((data) => {
    const initialTemplate = elementTemplate.content.cloneNode(true);
    const elementImage = initialTemplate.querySelector('.element__image');
    const elementLocation = initialTemplate.querySelector('.element__location');
   
    elementImage.src = data.link;
    elementLocation.textContent = data.name;
    
    elements.append(initialTemplate);
  });
}

createTemplate();

const viewPopup = document.querySelector('popup[name="viewPopup"]');
const viewPopupImage = viewPopup.querySelector('.popup__image');
const viewPopupCloseButton = viewPopup.querySelector('button[name="viewPopupCloseButton"]');

function handleImageView(event) {
  const clickedImage = event.target;
  const imageUrl = clickedImage.src;

  viewPopupImage.src = imageUrl;
  viewPopup.classList.add('popup_active');
}

elements.addEventListener('click', function(event) {
  if (event.target.classList.contains('element__image')) {
    handleImageView(event);
  }
});

function handleCloseViewForm() {
  viewPopup.classList.add('hide');
  viewPopup.classList.remove('popup_active');
}

viewPopupCloseButton.addEventListener('click', handleCloseViewForm);

/*viewPopupCloseButton.addEventListener('click', function() {
  viewPopup.classList.add('hide');
  viewPopup.classList.remove('popup_active');
});*/


function handleDeleteElement(event) {
  const deleteBtn = event.target;
  const element = deleteBtn.closest('.element');

  const index = Array.from(elements.children).indexOf(element);

  element.remove();
  initialCards.splice(index, 1);
}

elements.addEventListener('click', function(event) {
  if (event.target.classList.contains('element__delete')) {
    handleDeleteElement(event);
  }
});

elements.addEventListener('click', function(event) {
  if (event.target.classList.contains('element__like-button')) {
    event.target.classList.toggle('element__like-button_active');
  }
});

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

/*enableValidation();*/

function handleCloseEditForm() {
  editPopup.classList.add('hide');
  editPopup.classList.remove('popup_active');
}

function handleEditFormActive() {
  editPopup.classList.add('popup_active');

  nameInput.value = "";
  jobInput.value = "";

  nameInput.setAttribute("placeholder" , "Nama");
  jobInput.setAttribute("placeholder" , "Pekerjaan");

  enableValidation();
}

function handleSaveEditForm(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  handleCloseEditForm();
}

editBtn.addEventListener('click' , handleEditFormActive);
editPopupCloseButton.addEventListener('click' , handleCloseEditForm);
editPopup.addEventListener('submit' , handleSaveEditForm);

function handleAddFormActive() {
  addPopup.classList.add('popup_active');

  titleInput.value = "";
  webAddressInput.value = "";

  titleInput.setAttribute("placeholder" , "Judul");
  webAddressInput.setAttribute("placeholder" , "URL Gambar");

  enableValidation();
}

function handleCloseAddForm() {
  addPopup.classList.add('hide');
  addPopup.classList.remove('popup_active');
}

function handleSaveAddForm(event) {
  event.preventDefault();

  const titleValue = titleInput.value;
  const webAddressValue = webAddressInput.value;

  const newCard = {
    name: titleValue,
    link: webAddressValue
  };

  initialCards.unshift(newCard);
  createTemplate();
  handleCloseAddForm();
}

addPopup.addEventListener('submit', handleSaveAddForm);

addBtn.addEventListener('click' , handleAddFormActive);
addPopupCloseButton.addEventListener('click' , handleCloseAddForm);
addPopup.addEventListener('submit' , handleSaveAddForm);

viewOverlay.addEventListener("click" , handleCloseViewForm);
editOverlay.addEventListener("click" , handleCloseEditForm);
addOverlay.addEventListener("click" , handleCloseAddForm);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
    handleCloseEditForm();
    handleCloseViewForm();
    handleCloseAddForm();
  }
});
