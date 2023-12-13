let BASE_URL = process.env.BASE_URL;
export const getShowingProduct = async () => {
  const response = await fetch(`${BASE_URL}/product/`);
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

export const getAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/product/`);
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
