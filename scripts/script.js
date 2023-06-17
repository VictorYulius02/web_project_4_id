const editBtn = document.querySelector('.profile-info__edit-button');
const nameProfile = document.querySelector('.profile-info__name');
const jobProfile = document.querySelector('.profile-info__job');
const editPopup = document.querySelector('.edit-popup');
const nameInput = document.querySelector('input[name="nameInput"]');
const jobInput = document.querySelector('input[name="jobInput"]');
const editPopupCloseButton = document.querySelector('.edit-popup__close-button');

const addBtn = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.add-popup');
const titleInput = document.querySelector('input[name="titleInput"]');
const webAddressInput = document.querySelector('input[name="webAddressInput"]');
const addPopupCloseButton = document.querySelector('.add-popup__close-button');
const saveBtn = document.querySelector('.add-popup__save-button');

const elementTemplate = document.querySelector('.element-template');
const elements = document.querySelector('.elements');

const input = document.querySelector('.add-popup__input');

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

/*for (let i = 0; i <= 5 ; i++) {
  const initialTemplate = elementTemplate.content.cloneNode(true);
  const elementImage = initialTemplate.querySelector('.element__image');
  const elementLocation = initialTemplate.querySelector('.element__location');
  
  elementImage.src = initialCards[i].link;
  elementLocation.textContent = initialCards[i].name;
  
  elements.append(initialTemplate);
}*/

initialCards.forEach((data) => {
  const initialTemplate = elementTemplate.content.cloneNode(true);
  const elementImage = initialTemplate.querySelector('.element__image');
  const elementLocation = initialTemplate.querySelector('.element__location');
  const likeButton = initialTemplate.querySelector('.element__like-button');
  
  elementImage.src = data.link;
  elementLocation.textContent = data.name;
  
  elements.append(initialTemplate);
});

function handleEditFormActive() {
  editPopup.classList.add('edit-popup_active');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function handleCloseEditForm() {
  editPopup.classList.remove('edit-popup_active');
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

function saveBtnDisabled() {
  saveBtn.classList.add('add-popup__save-button_disabled');
  saveBtn.setAttribute('disabled' , 'true');
}

function handleAddFormActive() {
  addPopup.classList.add('add-popup_active');
  titleInput.setAttribute("placeholder" , "Judul");
  webAddressInput.setAttribute("placeholder" , "URL Gambar");
  saveBtnDisabled();

  if (titleInput.value !== "" || webAddressInput.value !== "") {
    titleInput.opacity = "1";
    webAddressInput.opacity = "1";
    saveBtn.classList.remove('add-popup__save-button_disabled');
  }
}

function handleCloseAddForm() {
  addPopup.classList.remove('add-popup_active');
}

function handleSaveAddForm (event) {
  event.preventDefault();
  const initialTemplate = elementTemplate.content.cloneNode(true);
  const elementImage = initialTemplate.querySelector('.element__image');
  const elementLocation = initialTemplate.querySelector('.element__location');
  const likeButton = initialTemplate.querySelector('.element__like-button');

  elementImage.src = webAddressInput.value;
  elementLocation.textContent = titleInput.value;

  elements.append(initialTemplate);
  handleCloseAddForm();
}

input.addEventListener("keypress" , event => {
  if (event.key === "Enter") {
    event.preventDefault();
    addPopup.click();
  }
})

addBtn.addEventListener('click' , handleAddFormActive);
addPopupCloseButton.addEventListener('click' , handleCloseAddForm);
addPopup.addEventListener('submit' , handleSaveAddForm);

