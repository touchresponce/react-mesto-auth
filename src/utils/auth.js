export const baseUrl = "https://auth.nomoreparties.co";

function checked(res) {
  if (res.ok) {
    return Promise.resolve(res.json());
  }
  return Promise.reject(res.status);
}

export const register = ({ password, email }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => {
    return checked(res);
  });
};

export const authorize = ({ identifier, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: identifier,
    }),
  })
    .then((res) => {
      return checked(res);
    })
    .then((data) => {
      if (data) {
        localStorage.setItem("token", data.token);
      }
      return data;
    });
};

export const getToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return checked(res);
    })
    .then(({ data }) => {
      return data;
    });
};
