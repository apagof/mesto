export class UserInfo {
  constructor(nameSelector, aboutSelector) {
    // this._nameSelector = nameSelector;
    // this._aboutSelector = aboutSelector;
    this._nameInput = document.querySelector(nameSelector);
    this._aboutInput = document.querySelector(aboutSelector);
  };

  getUserInfo() {
  const userData = {
  name: this._nameInput.textContent,
  profession: this._aboutInput.textContent
    }
  return userData;
  };

  setUserInfo({name, profession}) {
    this._nameInput.textContent = name;
    this._aboutInput.textContent = profession;
  };
}

