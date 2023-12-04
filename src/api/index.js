const BASE_URL = "http://127.0.0.1:8000/api"; // Thay đổi URL tương ứng với Django API của bạn

export const getOrderData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/order`);
    if (!response.ok) {
      throw new Error("Failed to fetch order data");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/product`);
    if (!response.ok) {
      throw new Error("Failed to fetch order data");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
