import {FormValidator} from "./FormValidator.js";
import {elements, elementTemplate, initialCards, Card, createTemplate} from "./Card.js";

const editBtn = document.querySelector('.profile-info__edit-button');
const nameProfile = document.querySelector('.profile-info__name');
const jobProfile = document.querySelector('.profile-info__job');

const editPopup = document.querySelector('popup[name="editPopup"]');
const nameInput = document.querySelector('input[name="nameInput"]');
const jobInput = document.querySelector('input[name="jobInput"]');
const editPopupCloseButton = document.querySelector('button[name="editPopupCloseButton"]');

const addBtn = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('popup[name="addPopup"]');
const titleInput = document.querySelector('input[name="titleInput"]');
const webAddressInput = document.querySelector('input[name="webAddressInput"]');
const addPopupCloseButton = document.querySelector('button[name="addPopupCloseButton"]');

const editOverlay = document.querySelector('div[name="editOverlay"]');
const addOverlay = document.querySelector('div[name="addOverlay"]');

const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((form) => {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  inputList.forEach((input) => {
    const validator = new FormValidator(form, input);
    validator.enableValidation();
  });
});

function handleEscKeypress(event) {
  if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
    handleCloseEditForm();
    handleCloseAddForm();
  };
}

function handleCloseEditForm() {
  editPopup.classList.add('hide');
  editPopup.classList.remove('popup_active');

  document.removeEventListener('keydown' , handleEscKeypress);
}

function handleEditFormActive() {
  editPopup.classList.add('popup_active');

  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  nameInput.setAttribute("placeholder" , "Nama");
  jobInput.setAttribute("placeholder" , "Pekerjaan");

  document.addEventListener('keydown' , handleEscKeypress);

  /*FormValidator.enableValidation();*/
}

function handleSaveEditForm(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  handleCloseEditForm();
}

function handleAddFormActive() {
  addPopup.classList.add('popup_active');

  titleInput.value = "";
  webAddressInput.value = "";

  titleInput.setAttribute("placeholder" , "Judul");
  webAddressInput.setAttribute("placeholder" , "URL Gambar");

  document.addEventListener('keydown' , handleEscKeypress);

  /*FormValidator.enableValidation();*/
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

export {editBtn, editPopupCloseButton,editPopup, addPopup, addBtn, addPopupCloseButton, editOverlay, addOverlay, 
  handleEditFormActive, handleCloseEditForm, handleSaveEditForm, handleAddFormActive, handleCloseAddForm, handleSaveAddForm};