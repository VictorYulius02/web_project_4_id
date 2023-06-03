const editBtn = document.querySelector('.profile-info__edit-button');
const nameProfile = document.querySelector('.profile-info__name');
const jobProfile = document.querySelector('.profile-info__job');
const editForm = document.querySelector('.edit-popup');
const nameInput = document.querySelector('input[name="nameInput"]');
const jobInput = document.querySelector('input[name="jobInput"]');
const editFormCloseButton = document.querySelector('.edit-popup__close-button');
const editFormSaveButton = document.querySelector('.edit-popup__save-button');

function handleEditFormActive() {
  editForm.classList.add('edit-popup_active');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function handleCloseEditForm() {
  editForm.classList.remove('edit-popup_active');
}

function handleSaveEditForm(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  handleSaveEditForm();
}

editBtn.addEventListener('click' , handleEditFormActive);
editFormCloseButton.addEventListener('click' , handleCloseEditForm);
editForm.addEventListener('submit' , handleSaveEditForm)