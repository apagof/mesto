export class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameInput = document.querySelector(nameSelector);
    this._aboutInput = document.querySelector(aboutSelector);
    this._avatar = document.querySelector('.profile__avatar');
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

setAvatar(url){
  this.avatar.src = url.avatar;
}
}

