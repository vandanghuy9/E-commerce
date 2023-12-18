import Image from "next/image";
import React from "react";
import {
  IoSettingsOutline,
  IoPersonOutline,
  IoNotificationsOutline,
  IoSearch,
  IoCartOutline,
} from "react-icons/io5";
import { useStateContext } from "@/context/StateContext";
import Cart from "./Cart";
import { Autocomplete, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import UserNavBar from "./UserNavbar";
const NavBar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const { checkIsLogin } = useUserContext();
  const options = ["The Godfather", "Pulp Fiction"];
  return (
    <div className="navbar-container items-center">
      <Link href="/">
        <Image src="/logo.png" width={80} height={80} />
      </Link>

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
              width: "500px",
            }}
          />
        )}
      />
      {(checkIsLogin() && <UserNavBar />) || (
        <div className="flex flex-row gap-2">
          <Link href={"/signin"} className="signin">
            Sign in
          </Link>
          <Link
            href={"/signup"}
            className="py-[10px] hover:underline hover:decoration-solid"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
