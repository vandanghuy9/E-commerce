var BASE_URL = process.env.BASE_URL;
export const getShowingProduct = async () => {
  const response = await fetch(`${BASE_URL}/product/`);
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

export const getAllProducts = async (searchQuery = "") => {
  let url = `${BASE_URL}/product/`;
  if (searchQuery) {
    url += `?name=${encodeURIComponent(searchQuery)}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/product/${id}`);
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

export const login = async ({ email, password }) => {
  const response = await fetch(`http://185.193.66.107:8000/api/login/`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

export const signup = async (email, password) => {
  const response = await fetch(`http://185.193.66.107:8000/api/register/`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to signup");
  }
  const data = await response.json();
  return data;
};

export const resetPassword = async (
  email,
  password,
  confirmPassword,
  handler
) => {
  fetch(`http://185.193.66.107:8000/api/reset_password/`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      new_password: password,
      confirm_password: confirmPassword,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      handler(data);
    });
};

export const getOrderHistory = async (id) => {
  const response = await fetch(
    `http://185.193.66.107:8000/api/order/user/${id}`
  );
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

export const placeOrderRequest = (data, handler) => {
  fetch(`http://185.193.66.107:8000/api/order/user/${data.user}`, {
    method: "POST",
    body: JSON.stringify({
      orders: [data],
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      handler(data);
    });
};

export const getUserById = (data, handler) => {
  fetch(`http://185.193.66.107:8000/api/user/${data}`)
    .then((response) => response.json())
    .then((data) => {
      handler(data.user);
    });
};

export const updateUserById = (data, handler) => {
  fetch(`http://185.193.66.107:8000/api/user/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      handler(data);
    });
};

export const commentProduct = (data, handler) => {
  fetch(`http://185.193.66.107:8000/api/review/product/${data.product_id}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      handler(data);
    });
};
