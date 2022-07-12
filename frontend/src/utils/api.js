class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._contentType = options.headers["Content-Type"];
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getCardList(token) {
    return fetch(`${this._baseUrl}cards/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResult);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResult);
  }

  setUserInfo(name, info, token) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": this._contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(name, info),
    }).then(this._checkResult);
  }

  editAvatar(avatar, token) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": this._contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar }),
    }).then(this._checkResult);
  }

  createCard(name, link, token) {
    return fetch(`${this._baseUrl}cards/`, {
      method: "POST",
      headers: {
        "Content-Type": this._contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResult);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": this._contentType,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResult);
  }

  putCardLike(cardId, token) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": this._contentType,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResult);
  }

  deleteCardLike(cardId, token) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResult);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return api.deleteCardLike(cardId, token);
    } else {
      return api.putCardLike(cardId, token);
    }
  }
}

const api = new Api({
  baseUrl: "https://api.malashkin.nomoredomains.xyz/",
  headers: {
    "Content-Type": "application/json",
    Accept: `application/json`,
  },
});

/* const api = new Api({
  baseUrl: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
    Accept: `application/json`,
  },
}); */

export default api;
