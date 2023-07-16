import {elements, elementTemplate, initialCards, Card, createTemplate} from "./Card.js";
import {editBtn, editPopupCloseButton,editPopup, addPopup, addBtn, addPopupCloseButton, editOverlay, addOverlay, 
  handleEditFormActive, handleCloseEditForm, handleSaveEditForm, handleAddFormActive, handleCloseAddForm, handleSaveAddForm} 
  from "./utils.js";

createTemplate();

editBtn.addEventListener('click' , handleEditFormActive);
editPopupCloseButton.addEventListener('click' , handleCloseEditForm);
editPopup.addEventListener('submit' , handleSaveEditForm);

addPopup.addEventListener('submit', handleSaveAddForm);

addBtn.addEventListener('click' , handleAddFormActive);
addPopupCloseButton.addEventListener('click' , handleCloseAddForm);
addPopup.addEventListener('submit' , handleSaveAddForm);

editOverlay.addEventListener("click" , handleCloseEditForm);
addOverlay.addEventListener("click" , handleCloseAddForm);