import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "@/context/StateContext";
import Cart from "./Cart";
const NavBar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p>
        <Link href="/">JSM Headphone</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart((prevShowCart) => !prevShowCart)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default NavBar;
