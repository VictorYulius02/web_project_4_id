const elementTemplate = document.querySelector('.element-template');
const elements = document.querySelector('.elements');

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

class Card {
  constructor(title, url, cardSelector) {
    this._title = title;
    this._url = url;
    this._cardSelector = cardSelector;

    this._viewPopup = document.querySelector('popup[name="viewPopup"]');
    this._viewPopupImage = this._viewPopup.querySelector('.popup__image');
    this._viewPopupCloseButton = this._viewPopup.querySelector('button[name="viewPopupCloseButton"]');
    this._viewOverlay = this._viewPopup.querySelector('div[name="viewOverlay"]');

    this._handleEscKeypress = this._handleEscKeypress.bind(this);
    this._handleImageView = this._handleImageView.bind(this);
    this._handleCloseViewForm = this._handleCloseViewForm.bind(this);
    this._handleDeleteElement = this._handleDeleteElement.bind(this);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleEscKeypress(event) {
    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
      this._handleCloseViewForm();
    }
  }

  _handleImageView(event) {
    const clickedImage = event.target;
    const imageUrl = clickedImage.src;

    this._viewPopupImage.src = imageUrl;
    this._viewPopup.classList.add('popup_active');
    
    document.addEventListener('keydown', this._handleEscKeypress);
  }

  _handleDeleteElement(event) {
    const deleteBtn = event.target;
    const element = deleteBtn.closest('.element');

    element.remove();

    const index = initialCards.findIndex(card => card.name === this._title && card.link === this._url);
    
    if (index !== -1) {
      initialCards.splice(index, 1);
    }
  }

  _handleCloseViewForm() {
    this._viewPopup.classList.add('hide');
    this._viewPopup.classList.remove('popup_active');

    document.removeEventListener('keydown', this._handleEscKeypress);
  }

  generateCard() {
    const element = this._getTemplate();
  
    element.querySelector('.element__image').src = this._url;
    element.querySelector('.element__location').textContent = this._title;
    
    element.addEventListener('click', function(event) {
      if (event.target.classList.contains('element__image')) {
        this._handleImageView(event);
      }
    }.bind(this));

    element.querySelector('.element__delete').addEventListener('click', this._handleDeleteElement);
    this._viewPopupCloseButton.addEventListener('click', this._handleCloseViewForm);
    this._viewOverlay.addEventListener("click" , this._handleCloseViewForm);
    element.querySelector('.element__like-button').addEventListener('click', function(event) {
      event.target.classList.toggle('element__like-button_active');
    });
  
    return element;
  }
}

function createTemplate() {
  while (elements.firstChild) {
    elements.firstChild.remove();
  }

  initialCards.forEach((data) => {
    const card = new Card(data.name, data.link, ".element-template");
    const initialTemplate = card.generateCard();

    elements.append(initialTemplate);
  });
}

export {elements, elementTemplate, initialCards, Card, createTemplate};