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

function handleEscKeypress(event) {
  if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
    handleCloseViewForm();
    handleCloseEditForm();
    handleCloseAddForm();
  };
}

function handleCloseViewForm() {
  viewPopup.classList.add('hide');
  viewPopup.classList.remove('popup_active');

  document.removeEventListener('keydown' , handleEscKeypress);
}

function handleImageView(event) {
  const clickedImage = event.target;
  const imageUrl = clickedImage.src;

  viewPopupImage.src = imageUrl;
  viewPopup.classList.add('popup_active');
  
  document.addEventListener('keydown' , handleEscKeypress);
}

elements.addEventListener('click', function(event) {
  if (event.target.classList.contains('element__image')) {
    handleImageView(event);
  }
});

viewPopupCloseButton.addEventListener('click', handleCloseViewForm);

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

function handleCloseEditForm() {
  editPopup.classList.add('hide');
  editPopup.classList.remove('popup_active');

  document.removeEventListener('keydown' , handleEscKeypress);
}

function handleEditFormActive() {
  editPopup.classList.add('popup_active');

  nameInput.value = "";
  jobInput.value = "";

  nameInput.setAttribute("placeholder" , "Nama");
  jobInput.setAttribute("placeholder" , "Pekerjaan");

  document.addEventListener('keydown' , handleEscKeypress);

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

  document.addEventListener('keydown' , handleEscKeypress);

  enableValidation();
}

function handleCloseAddForm() {
  addPopup.classList.add('hide');
  addPopup.classList.remove('popup_active');

  document.removeEventListener('keydown' , handleEscKeypress);
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