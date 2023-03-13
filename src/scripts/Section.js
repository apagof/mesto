export class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
    this._renderItems = items;
  }

  renderItems() {

    this._renderItems.forEach((item) => {
      this._renderer(item);
    });
  };
 renderItem(item) {
  this._renderer(item);
 };

  addItem(card) {
    this._container.prepend(card);
  };
}
