const formElement = document.querySelector('.page');
const editBtn = formElement.querySelector('.profile-info__edit-button');
//const addBtn = formElement.querySelector('.profile__add-button');
const nameProfile = formElement.querySelector('.profile-info__name');
const jobProfile = formElement.querySelector('.profile-info__job');
const editForm = formElement.querySelector('.edit-form');
const nameInput = formElement.querySelector('.edit-form__name');
const jobInput = formElement.querySelector('.edit-form__job');
const editFormCloseButton = formElement.querySelector('.edit-form__close-button');
const editFormSaveButton = formElement.querySelector('.edit-form__save-button');

function handleEditFormActive() {
  editForm.classList.add('edit-form-active');
  nameInput.setAttribute('placeholder' , nameProfile.textContent);
  jobInput.setAttribute('placeholder' , jobProfile.textContent);
}

function handleCloseEditForm() {
  editForm.classList.remove('edit-form-active');
}

function handleSaveEditForm() {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  editForm.classList.remove('edit-form-active');
}

editBtn.addEventListener('click' , handleEditFormActive);
editFormCloseButton.addEventListener('click' , handleCloseEditForm);
editFormSaveButton.addEventListener('click' , handleSaveEditForm);