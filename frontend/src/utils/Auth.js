export const BASE_URL = 'https://api.mesto.ln.nomoredomains.club';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((res) => {
            return checkResponse(res);
        })
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email}),
    })
        .then((res) => {
            return checkResponse(res);
        })
        .then((data) => {
            console.log(data);
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            }
        })
};

export const validate = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res) => {
            return checkResponse(res);
        })
        .then((res) => {
            if (res.data.email) {
                return res;
            }
        });
};
