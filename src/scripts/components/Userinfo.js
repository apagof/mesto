export class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameInput = document.querySelector(nameSelector);
    this._aboutInput = document.querySelector(aboutSelector);
    this._avatarSelector = avatarSelector;
    this._avatar = document.querySelector(this._avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameInput.textContent,
      profession: this._aboutInput.textContent,
    };
  }

  setUserInfo({ name, profession }) {
    if (name !== undefined) this._nameInput.textContent = name;
    if (profession !== undefined) this._aboutInput.textContent = profession;
  }

  setAvatar(data) {
    if (data.avatar !== undefined) this._avatar.src = data.avatar;
  }
}
