import Image from "next/image";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import {
  IoSettingsOutline,
  IoPersonOutline,
  IoNotificationsOutline,
  IoSearch,
} from "react-icons/io5";
import { useStateContext } from "@/context/StateContext";
import Cart from "./Cart";
import { Autocomplete, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const NavBar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const options = ["The Godfather", "Pulp Fiction"];
  return (
    <div className="navbar-container items-center">
      <Image src="/logo.png" width={80} height={80} />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IoSearch className="w-[20px] h-[20px]" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
              },
            }}
          />
        )}
      />

      <div className="flex flex-row gap-3 ">
        <IoNotificationsOutline className="w-[20px] h-[20px]" />
        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart((prevShowCart) => !prevShowCart)}>
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
        <IoSettingsOutline className="w-[20px] h-[20px]" />
        <IoPersonOutline className="w-[20px] h-[20px]" />
      </div>
      {showCart && <Cart />}
    </div>
  );
};

export default NavBar;
