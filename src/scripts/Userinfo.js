export class UserInfo {
  constructor(nameSelector, aboutSelector) {
    // this._nameSelector = nameSelector;
    // this._aboutSelector = aboutSelector;
    this._nameInput = document.querySelector(nameSelector);
    this._aboutInput = document.querySelector(aboutSelector);
  };

  getUserInfo() {
  this._nameValue = this._nameInput.textContent;
  this._aboutText = this._aboutInput.textContent;
  this._values = {name: this._nameValue, description: this._aboutText};
  return this._values;
  };

  setUserInfo({name, description}) {
    this._nameInput.textContent = name;
    this._aboutInput.textContent = description;
  };
}
