import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupSelector.querySelector('.popup__image');
    this._caption = this._popupSelector.querySelector('.popup__caption');
  }

  open(imageUrl, caption) {
    super.open();
    this._image.src = imageUrl;
    this._image.alt = caption;
    this._caption.textContent = caption;    
    super._setEventListeners();
  }
}

export default PopupWithImage;