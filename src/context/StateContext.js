import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Tong so tien
  const [totalQuantities, setTotalQuantities] = useState(0); // So mon hang trong cart
  const [qty, setQty] = useState(1);
  const increaseQuantity = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decreaseQuantity = () => {
    setQty((prevqty) => (prevqty === 0 ? 0 : prevqty - 1));
  };
  const addToCart = (product, quantity) => {
    const isProductInCart = cartItems.find((item) => item._id === product._id);
    if (isProductInCart) {
      isProductInCart.quantity += 1;
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price * quantity
      );
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities + parseInt(quantity)
      );
      setCartItems((prevCartItems) => [...prevCartItems]);
    } else {
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price * quantity
      );
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities + parseInt(quantity)
      );
      product.quantity = quantity;
      setCartItems((prevCartItems) => [...prevCartItems, product]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
    setQty(1);
    console.log(cartItems);
  };
  const toggleCartItem = (_id, value) => {
    let foundProduct = cartItems.find((item) => item._id === _id);
    let index = cartItems.findIndex((item) => item._id === _id);
    // console.log(foundProduct);

    if (value === "inc") {
      foundProduct.quantity += 1;
      setCartItems((prevCartItems) => {
        return [...prevCartItems];
      });
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else {
      if (foundProduct.quantity > 1) {
        foundProduct.quantity -= 1;
        setCartItems((prevCartItems) => [...prevCartItems]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };
  const deteleFromCartItems = (_id) => {
    const deletedItems = cartItems.find((item) => item._id == _id);
    const decreasedPrice = deletedItems.price * deletedItems.quantity;
    const decreasedQuantities = deletedItems.quantity;
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item._id !== _id)
    );
    setTotalPrice((prevTotalPrice) => prevTotalPrice - decreasedPrice);
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - decreasedQuantities
    );
  };
  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        increaseQuantity,
        decreaseQuantity,
        toggleCartItem,
        addToCart,
        setShowCart,
        deteleFromCartItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
