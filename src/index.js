import "./styles/index.css";

import headerImg from "./images/header.png";
import profileAvt from "./images/AvatarPicture.png";

import PopupWithForm from './components/PopupWithForms.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';
import FormValidator from './components/FormValidator.js';
import { initialCards , Card} from './components/Card.js';
import Section from './components/Section.js';

const headerImage = document.getElementById('header-image');
headerImage.src = headerImg;

const profileAvatar = document.getElementById('profile-avatar');
profileAvatar.src= profileAvt;

const userInfo = new UserInfo('.profile-info__name', '.profile-info__job');

const editProfileFormPopup = new PopupWithForm('.popup[name="editPopup"]', (formData) => {
  userInfo.setUserInfo(formData);
  editProfileFormPopup.close();
});

const editProfileForm = document.querySelector('.popup[name="editPopup"] .popup__form');
const nameInput = editProfileForm.querySelector('#name-input');
const jobInput = editProfileForm.querySelector('#job-input');

const editButton = document.querySelector('.profile-info__edit-button');
editButton.addEventListener('click', () => {
  
  const currentUserInfo = userInfo.getUserInfo();
  
  editProfileFormPopup.open();

  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;
});

const cardSection = new Section({
  items: initialCards,
  renderer: (itemData) => {
    const card = new Card(itemData.name, itemData.link, '.element-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
  }
}, '.elements');

cardSection.renderItems();

function handleCardClick(title , url) {
  const popupWithImage = new PopupWithImage('.popup[name="viewPopup"]');  
  popupWithImage.open(url, title);
}

const addFormPopup = new PopupWithForm('.popup[name="addPopup"]', (formData) => {
  const newItem = {
    name: formData.titleInput,
    link: formData.webAddressInput
  };

  initialCards.unshift(newItem);

  titleInput.value = "";
  webAddressInput.value = "";

  cardSection.renderItems();

  addFormPopup.close();
});

const addPopupButton = document.querySelector('.profile__add-button');
const titleInput = document.querySelector('#title-input');
const webAddressInput = document.querySelector('#webaddress-input');
addPopupButton.addEventListener('click', () => {
  titleInput.value = "";
  webAddressInput.value = "";
  
  titleInput.setAttribute("placeholder" , "Judul");
  webAddressInput.setAttribute("placeholder" , "URL Gambar");

  addFormPopup.open();
});

const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((form) => {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  inputList.forEach((input) => {
    const validator = new FormValidator(form, input);
    validator.enableValidation();
  });
});

editProfileFormPopup.setEventListeners();
addFormPopup.setEventListeners();
