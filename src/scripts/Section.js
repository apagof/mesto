export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  getItems() {
    this._renderItems.forEach((item) => {
      this._renderItems(item);
    });
  };

  getItem(item) {
    this._renderItems(item);
  };

  addItem(card) {
    this._container.prepend(card);
  };
}
