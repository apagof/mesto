export class API {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }


getCards() {
  fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', {
    method: 'GET',
  headers: {
    authorization: '9144373c-04cd-49fd-a484-74e2aad42f33'
  }
  })
  .then(res => res.json())
  .then((res) => {
    console.log(res.json);
  })
}

addCard(name, link) {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', {
    method: 'POST',
    headers: {
      authorization: '9144373c-04cd-49fd-a484-74e2aad42f33',
    body: JSON.stringify({
      name: name,
      link: link
    })
    }
  })
    .then((res) => res)
  }



getData() {
  fetch('https://nomoreparties.co/v1/cohortId/users/me', {
    method: 'GET',
    headers: {
      authorization: '9144373c-04cd-49fd-a484-74e2aad42f33'
    }
    .then (res => res)
  })

}
}

