const BASE_URL = "http://localhost:8000/api";
export const getShowingProduct = async () => {
  const response = await fetch(`${BASE_URL}/product/`);
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};
