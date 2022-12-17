class Api {
  constructor(options) {
      this._url = options.baseUrl;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
        }
    }).then(this._checkServerResponse);
  }

  createCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
            },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkServerResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
        },
    }).then(this._checkServerResponse);
  }

    addLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
        }).then(this._checkServerResponse);
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
        }).then(this._checkServerResponse);
    }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
        credentials: 'include',
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
        },
    }).then(this._checkServerResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
        },
      body: JSON.stringify({ ...data }),
    }).then(this._checkServerResponse);
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
        },
      body: JSON.stringify({ ...data }),
    }).then(this._checkServerResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.deleteLike(cardId) : this.addLike(cardId);
  }
}

export const api = new Api({
  baseUrl: "https://api.mesto.ln.nomoredomains.club",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    },
});
