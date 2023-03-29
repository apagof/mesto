export class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameInput = document.querySelector(nameSelector);
    this._aboutInput = document.querySelector(aboutSelector);
    this._avatarSelector = avatarSelector;
    this._avatar = document.querySelector(this._avatarSelector);
  };

  getUserInfo() {
  return {
  name: this._nameInput.textContent,
  profession: this._aboutInput.textContent
    }
  };

  setUserInfo({name, profession}) {
    this._nameInput.textContent = name;
    this._aboutInput.textContent = profession;
  };

setAvatar(data){
  this._avatar.src = data.avatar;
}
}

