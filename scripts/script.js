const editBtn = document.querySelector('.profile-info__edit-button');
const nameProfile = document.querySelector('.profile-info__name');
const jobProfile = document.querySelector('.profile-info__job');

const editPopup = document.querySelector('.edit-popup');
const nameInput = document.querySelector('input[name="nameInput"]');
const jobInput = document.querySelector('input[name="jobInput"]');
const editPopupCloseButton = document.querySelector('.edit-popup__close-button');

const likeBtn = document.querySelectorAll('.element__like-button');

const addBtn = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.add-popup');
const titleInput = document.querySelector('input[name="titleInput"]');
const webAddressInput = document.querySelector('input[name="webAddressInput"]');
const addPopupCloseButton = document.querySelector('.add-popup__close-button');
const saveBtn = document.querySelector('.add-popup__save-button');
const titleErrorMsg = document.querySelector('p[name="titleErrorMsg"]');
const webAddressErrorMsg = document.querySelector('p[name="webAddressErrorMsg"]');

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

const viewPopup = document.querySelector('.view-popup');
const viewPopupImage = viewPopup.querySelector('.view-popup__image');
const viewPopupCloseButton = viewPopup.querySelector('.view-popup__close-button');

function handleImageView(event) {
  const clickedImage = event.target;
  const imageUrl = clickedImage.src;

  viewPopupImage.src = imageUrl;
  viewPopup.classList.add('view-popup_active');
}

elements.addEventListener('click', function(event) {
  if (event.target.classList.contains('element__image')) {
    handleImageView(event);
  }
});

viewPopupCloseButton.addEventListener('click', function() {
  viewPopup.classList.remove('view-popup_active');
});


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

function handleEditFormActive() {
  editPopup.classList.add('edit-popup_active');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function handleCloseEditForm() {
  editPopup.classList.add('hide');
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

/*function saveBtnDisabled() {
  saveBtn.classList.add('add-popup__save-button_disabled');
  saveBtn.setAttribute('disabled' , 'true');
}*/

function enableSaveBtn() {
  if (titleInput.value !== '' || webAddressInput.value !== '') {

    titleInput.style.opacity = "1";
    webAddressInput.style.opacity = "1";

    saveBtn.disabled = false;
    saveBtn.classList.remove('add-popup__save-button_disabled');
  }
}

function handleAddFormActive() {
  addPopup.classList.add('add-popup_active');
  titleInput.setAttribute("placeholder" , "Judul");
  webAddressInput.setAttribute("placeholder" , "URL Gambar");
  
  titleInput.addEventListener('input' , enableSaveBtn);
  webAddressInput.addEventListener('input' , enableSaveBtn);

  enableSaveBtn();
}

function handleCloseAddForm() {
  addPopup.classList.add('hide');
  addPopup.classList.remove('add-popup_active');
}

function handleSaveAddForm(event) {
  event.preventDefault();

  const titleValue = titleInput.value;
  const webAddressValue = webAddressInput.value;

  if (titleValue.trim() !== '') {
    titleErrorMsg.style.display ='none';
  }

  if (webAddressValue.trim() !== '') {
    webAddressErrorMsg.style.display ='none';
  }

  if (titleValue.trim() === '') {
    titleErrorMsg.style.display = 'block';
    return;
  }

  if (webAddressValue.trim() === '') {
    webAddressErrorMsg.style.display = 'block';
    return;
  }

  const newCard = {
    name: titleValue,
    link: webAddressValue
  };

  initialCards.push(newCard);
  createTemplate();
  handleCloseAddForm();

  titleInput.value = '';
  webAddressInput.value = '';
  titleErrorMsg.style.display = 'none';
  webAddressErrorMsg.style.display = 'none';
}

addPopup.addEventListener('submit', handleSaveAddForm);

addBtn.addEventListener('click' , handleAddFormActive);
addPopupCloseButton.addEventListener('click' , handleCloseAddForm);
addPopup.addEventListener('submit' , handleSaveAddForm);
/*addPopup.addEventListener('submit' , createTemplate);*/

input.addEventListener("keypress" , event => {
  if (event.key === "Enter") {
    event.preventDefault();
    addPopup.submit();
  }
})