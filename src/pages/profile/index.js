import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { TextField, FormControl } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { getOrderHistory, getProductById, getAllProducts } from "@/utils/api";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
const initialData = {
  username: "",
  email: "",
  phone: "",
  gender: 0,
  date_of_birth: "",
};
const Profile = () => {
  const router = useRouter();
  const [selectedButton, setSelectedButton] = useState("myProfile");
  const { logout, checkIsLogin, getUserInfo, updateUser } = useUserContext();
  const [selectedItems, setSelectedItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersDetails, setOrdersDetails] = useState([]);
  const [user, setUser] = useState({});
  const displayUsername = useRef();
  const handleButtonClick = (button, id) => {
    getOrderHistory(sessionStorage.getItem("user"))
      .then((data) => {
        let newOrdersDetail;
        data.orders.forEach((order) => {
          if (order.id === id) {
            newOrdersDetail = order.order_details.map((ordersDetail) => ({
              id: ordersDetail.id,
              product_name: ordersDetail.product.name,
              category: ordersDetail.product.category.name,
              amount: ordersDetail.count,
              total:
                order.ship_fee +
                ordersDetail.product.price * ordersDetail.count,
              status: "Pendding",
            }));

            console.log("Test Order:", newOrdersDetail);
          }
        });

        const newOrders = data.orders.map((order) => ({
          id: order.id,
          date: order.time.split("T")[0],
          price: order.price,
          ship_fee: order.ship_fee,
          status: "Pendding",
        }));
        setOrders(newOrders);
        setOrdersDetails(newOrdersDetail);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });

    setSelectedButton(button);
  };

  const handleLogout = (e) => {
    if (checkIsLogin() === true) {
      logout();
      router.push("/");
    }
  };

  const handleCheckboxChange = (orderId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(orderId)) {
        return prevSelectedItems.filter((id) => id !== orderId);
      } else {
        return [...prevSelectedItems, orderId];
      }
    });
  };
  const handleDeleteSelectedItems = () => {};
  const handleUpdateInfo = (e) => {
    e.preventDefault();
    console.log(user);
    updateUser(user);
    displayUsername.current = user.username;
  };
  useEffect(() => {
    console.log(sessionStorage.getItem("user"));

    if (checkIsLogin() === false) {
      router.push("/signin");
    } else {
      getUserInfo(sessionStorage.getItem("user"), (data) => {
        setUser(data);
        displayUsername.current = user.username;
      });
    }
  }, []);
  return (
    <div className="flex justify-center gap-10">
      <div className="flex flex-col p-5 justify-between">
        <div className="flex flex-col gap-5">
          <div className="flex gap-4">
            <FaUserCircle className="w-[30px] h-[30px]" />
            <span className="font-bold">{displayUsername.current}</span>
          </div>
          <button
            className={`px-10 text-${
              selectedButton === "myProfile" ? "white" : "black"
            } cursor-pointer py-3 rounded-3xl text-center ${
              selectedButton === "myProfile"
                ? "bg-[#f02d34] border border-[#f02d34]"
                : "bg-white border border-black"
            }`}
            onClick={() => handleButtonClick("myProfile")}
          >
            My profile
          </button>
          <button
            className={`px-10 text-${
              selectedButton === "orderHistory" ? "white" : "black"
            } cursor-pointer py-3 border rounded-3xl text-center ${
              selectedButton === "orderHistory"
                ? "bg-[#f02d34] border border-[#f02d34]"
                : "bg-white border border-black"
            }`}
            onClick={() => handleButtonClick("orderHistory")}
          >
            Order history
          </button>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="self-end border border-gray-400 px-5 py-2 rounded bg-gray-200 cursor-pointer hover:bg-gray-300"
        >
          Log out
        </button>
      </div>
      <div
        className={`p-10 border border-gray-400 rounded-xl gap-7 flex flex-col ${
          selectedButton === "myProfile" ? "" : "hidden"
        }`}
        id="myProfileContent"
      >
        <FormControl>
          <form onSubmit={handleUpdateInfo}>
            <div className="font-bold">My profile</div>
            <div className="flex gap-20">
              <div className="gap-5 flex flex-col min-w-[250px]">
                <div className="flex flex-row gap-7">
                  <div className="flex-1 text-right">Username</div>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    placeholder="User001"
                    value={user.username ? user.username : ""}
                    name="username"
                    onChange={(e) =>
                      setUser((user) => ({
                        ...user,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-row gap-7">
                  <span className="flex-1 text-right">Email</span>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    placeholder="user@gmail.com"
                    name="email"
                    value={user.email ? user.email : ""}
                    onChange={(e) =>
                      setUser((user) => ({
                        ...user,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-row gap-7">
                  <span className="flex-1 text-right">Phone</span>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    placeholder="******999"
                    name="phone"
                    value={user.phone ? user.phone : ""}
                    onChange={(e) =>
                      setUser((user) => ({
                        ...user,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex justify-center items-center gap-3">
                  <FormLabel id="gender" className="text-right">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={user.gender}
                    name="gender"
                    row
                    onChange={(e) =>
                      setUser((user) => ({
                        ...user,
                        [e.target.name]: parseInt(e.target.value),
                      }))
                    }
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="Female"
                      name="gender"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Male"
                      name="gender"
                    />
                  </RadioGroup>
                </div>
              </div>
              <div className="flex justify-center flex-col items-center gap-5">
                <FaUserCircle className="w-[70px] h-[70px]" />
                <div className="border py-2 px-4 rounded border-gray-300 shadow-md cursor-pointer">
                  Choose picture
                </div>
              </div>
            </div>
            <div className="flex gap-7 items-center">
              <span>DOB</span>
              <span className="border border-gray-300 px-4 py-2 rounded">
                <input
                  type="date"
                  name="date_of_birth"
                  value={user.date_of_birth}
                  onChange={(e) =>
                    setUser((user) => ({
                      ...user,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </span>
            </div>
            <Button
              style={{ float: "right" }}
              className="bg-red-500 hover:bg-red-600 text-white"
              type="submit"
            >
              Save
            </Button>
          </form>
        </FormControl>
      </div>

      {/* OrderHistory */}
      <div
        className={`p-10 border border-gray-400 rounded-xl gap-7 flex flex-col ${
          selectedButton === "orderHistory" ? "" : "hidden"
        }`}
        id="orderHistoryContent"
      >
        <div className="font-bold">Order history</div>

        <div className="flex justify-center gap-5">
          <Button variant="outlined">All</Button>
          <Button variant="outlined">Today</Button>
          <Button variant="outlined">This Week</Button>
          <Button variant="outlined">This Month</Button>
        </div>
        <div className="table-container">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th style={{ width: "50px", textAlign: "center" }}>STT</th>
                <th style={{ width: "120px", textAlign: "center" }}>Date</th>
                <th style={{ width: "100px", textAlign: "center" }}>Price</th>
                <th style={{ width: "100px", textAlign: "center" }}>
                  Shipping Fee
                </th>
                <th style={{ width: "150px", textAlign: "center" }}>Status</th>
                <th style={{ width: "70px", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>{order.date}</td>
                  <td style={{ textAlign: "center" }}>{order.price}</td>
                  <td style={{ textAlign: "center" }}>{order.ship_fee}</td>
                  <td style={{ textAlign: "center" }}>{order.price}</td>
                  <td style={{ textAlign: "center" }}>{order.ship_fee}</td>
                  <td style={{ textAlign: "center" }}>{order.status}</td>

                  <td
                    style={{
                      textAlign: "left",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                    onClick={() =>
                      handleButtonClick("orderHistoryDetail", order.id)
                    }
                  >
                    Detail
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Checkbox
                      onChange={() => handleCheckboxChange(order.id)}
                      checked={selectedItems.includes(order.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="self-end px-10 cursor-pointer py-3 bg-[#f02d34] rounded-3xl text-white"
          onClick={handleDeleteSelectedItems}
        >
          Delete Selected
        </div>
      </div>

      {/* Order History Detail */}
      <div
        className={`p-10 border border-gray-400 rounded-xl gap-7 flex flex-col ${
          selectedButton === "orderHistoryDetail" ? "" : "hidden"
        }`}
        id="orderHistoryContentDetail"
      >
        <div className="font-bold">Order history detail</div>

        <div className="flex justify-center gap-5">
          <Button variant="outlined">All</Button>
          <Button variant="outlined">Today</Button>
          <Button variant="outlined">This Week</Button>
          <Button variant="outlined">This Month</Button>
        </div>
        <div className="table-container">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th style={{ width: "50px", textAlign: "center" }}>STT</th>
                <th style={{ width: "120px", textAlign: "center" }}>
                  Product Name
                </th>
                <th style={{ width: "150px", textAlign: "center" }}>
                  Category
                </th>
                <th style={{ width: "100px", textAlign: "center" }}>Amount</th>
                <th style={{ width: "100px", textAlign: "center" }}>Total</th>
                <th style={{ width: "80px", textAlign: "center" }}>Status</th>
                <th style={{ width: "70px", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {ordersDetails?.map((ordersDetail, index) => (
                <tr key={ordersDetail.id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>
                    {ordersDetail.product_name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {ordersDetail.category}
                  </td>
                  <td style={{ textAlign: "center" }}>{ordersDetail.amount}</td>
                  <td style={{ textAlign: "center" }}>{ordersDetail.total}</td>
                  <td style={{ textAlign: "center" }}>{ordersDetail.status}</td>
                  <td style={{ textAlign: "center" }}>
                    <Checkbox
                      onChange={() => handleCheckboxChange(ordersDetail.id)}
                      checked={selectedItems.includes(ordersDetail.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="self-end px-10 cursor-pointer py-3 bg-[#f02d34] rounded-3xl text-white"
          onClick={handleDeleteSelectedItems}
        >
          Delete Selected
        </div>
      </div>
    </div>
  );
};

export default Profile;
