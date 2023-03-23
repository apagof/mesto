export class API {
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
// получить карточки
getCards() {
  return fetch(`${this._baseUrl}/cards`, {
    headers: this._headers})
    .then(response => this._checkRequestResult(response))
    .catch(error => this._errorHandler(error));
  }
// добавление карочки на сервер
addCard(data) {
  return fetch(`${this._baseUrl}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      name: `${data.name}`,
      link: `${data.link}`
    })
    })
    .then(response => this._checkRequestResult(response))
    .catch(error => this._errorHandler(error));
  }
// Удаление карты
deleteCard(cardId) {
  return fetch(`${this.baseUrl}/cards/${cardId}`, {
  method: 'DELETE',
  headers: this._headers,
})
.then(response => this._checkRequestResult(response))
.catch(error => this._errorHandler(error));
}

// поставить лайк
likeCard(cardId) {
  return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: this._headers,
  })
  .then(response => this._checkRequestResult(response))
  .catch(error => this._errorHandler(error));
}
// Убрать лайк с карты
unlikeCard(cardId) {
  return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: this._headers,
  })
  .then(response => this._checkRequestResult(response))
  .catch(error => this._errorHandler(error));
}

// Получить данные пользователя
getUserInfo() {
  return fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers})
  .then(response => this._checkRequestResult(response))
  .catch(error => this._errorHandler(error));
}

// Редактировать данные пользователя
editUserInfo(name, profession) {
  return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: name,
      about: profession
    })
  })
  .then(response => this._checkRequestResult(response))
  .catch(error => this._errorHandler(error));
}
// Редактировать аватар
editAvatar(link) {
  console.log(link);
  return fetch(`${this._baesUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      avatar: `${link}`
    })
  })
    .then(response => this._checkRequestResult(response))
    .catch(error => this._errorHandler(error));
}

_checkRequestResult(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

_errorHandler(error) {
  console.log(error);
}

}
