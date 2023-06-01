let editBtn = document.querySelector('.profile-info__edit-button');
//let addBtn = document.querySelector('.profile__add-button');
let profileInfoName = document.querySelector('.profile-info__name');
let profileInfoJob = document.querySelector('.profile-info__job');
let editForm = document.querySelector('.edit-form');
let editFormName = document.querySelector('.edit-form__name');
let editFormJob = document.querySelector('.edit-form__job');
let editFormCloseButton = document.querySelector('.edit-form__close-button');

function editFormActive() {
  editForm.classList.add('edit-form-active');
  editFormName.setAttribute('placeholder' , profileInfoName.textContent);
  editFormJob.setAttribute('placeholder' , profileInfoJob.textContent);
}

function closeEditForm() {
  editForm.classList.remove('edit-form-active');
}

editBtn.addEventListener('click' , editFormActive);
editFormCloseButton.addEventListener('click' , closeEditForm);