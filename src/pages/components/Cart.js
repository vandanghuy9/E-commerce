import React from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "@/context/StateContext";

const Cart = () => {
  const {
    setShowCart,
    showCart,
    totalQuantities,
    cartItems,
    totalPrice,
    toggleCartItem,
    deteleFromCartItems,
  } = useStateContext();
  const handleCheckout = () => {};
  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <div>
          <button
            type="button"
            className="cart-heading"
            onClick={() => setShowCart(false)}
          >
            <AiOutlineLeft />
            <span className="heading">Your cart</span>
            <span className="cart-num-items">{`(${cartItems.length} ${
              cartItems.length > 0 ? "items" : "item"
            })`}</span>
          </button>
        </div>
        {totalQuantities === 0 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your cart is empty</h3>
            <Link href="/">
              <button
                className="btn"
                type="button"
                onClick={() => setShowCart((prevShowCart) => !prevShowCart)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length > 0 &&
            cartItems?.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={item.image[0] && item.image[0]}
                  className="cart-product-image"
                  alt={item.name}
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>$ {item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    {/* <h5>Quantity</h5> */}
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => toggleCartItem(item._id, "desc")}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() => toggleCartItem(item._id, "inc")}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => deteleFromCartItems(item._id)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                  {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                      <div className="total">
                        <h5>Subtotal: </h5>
                        <h3>${totalPrice}</h3>
                      </div>
                      <div className="btn-container">
                        <button
                          type="button"
                          className="btn"
                          onClick={handleCheckout}
                        >
                          Pay with Stripe
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
