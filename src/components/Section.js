class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    while (this._container.firstChild) {
      this._container.removeChild(this._container.firstChild);
    }

    this._items.forEach(item => {
      const cardElement = this._renderer(item);
      this.addItem(cardElement);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

export default Section;