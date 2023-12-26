import Image from "next/image";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/StateContext";
import { Autocomplete, TextField } from "@mui/material";

import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import UserNavBar from "./UserNavbar";
const NavBar = () => {
  const { getSearchValue } = useStateContext();
  const router = useRouter();
  const [searchValue, setSearchValue] = React.useState("");
  const { checkIsLogin } = useUserContext();
  const options = ["The Godfather", "Pulp Fiction"];

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim() !== "") {
      getSearchValue(searchValue);
    }
  };

  return (
    <div className="items-center navbar-container">
      <Link href="/">
        <Image src="/logo.png" width={80} height={80} />
      </Link>

      <form onSubmit={handleSearchSubmit}>
        <Autocomplete
          id="search-autocomplete"
          freeSolo
          options={options}
          value={searchValue}
          onChange={handleSearchChange}
          sx={{ width: 400 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <IoSearch
                    onClick={handleSearchSubmit}
                    className="cursor-pointer"
                  />
                ),
                sx: {
                  borderRadius: "32px", // Set the border radius here
                },
              }}
            />
          )}
        />
      </form>

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
