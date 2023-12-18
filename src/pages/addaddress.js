import React from "react";
import  { useState } from 'react';
import { FiUser } from "react-icons/fi";
import Image from "next/image";
import { useStateContext } from "@/context/StateContext";
const Addaddress = () => {
  //data
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const { cartItems, totalPrice, totalQuantities, qty, showCart } =
    useStateContext();
  const shippingFee = totalPrice / 2;
  const paymentOptions = ["payment after shipping", "online payment"];

  return (
    <div>
      <div className="pt-12 pb-2">
        <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl">
          <div className="md:flex-col">
          <div className="address-container">
          <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '50px', marginBottom: '20px', color:'red' }}>Delivery Address Information</h2>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          style={{ width: '300px', margin: '8px', padding: '10px', fontSize: '30px' }}
        />
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          style={{ width: '300px', margin: '8px', padding: '10px', fontSize: '30px' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          placeholder="Province/City"
          style={{ width: '300px', margin: '8px', padding: '10px', fontSize: '30px' }}
        />
        <input
          type="text"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          placeholder="District"
          style={{ width: '300px', margin: '8px', padding: '10px', fontSize: '30px' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
          placeholder="Street Address"
          style={{ width: '620px', margin: '8px', padding: '10px', fontSize: '30px' }}
        />
      </div>

      </div>
    </div>
            <div className="py-2">
              <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl">
                <div className="md:flex">
                  <div className="w-full px-5 py-2">
                    <div className="p-5">
                      <div className="flex gap-2 justify-between text-red-500 items-center">
                        <h2 className="text-xl font-medium pr-8">
                          Products Ordered
                        </h2>
                        <div className="text-xl pr-8">Price</div>
                        <div className="text-xl pr-8">Quantity</div>
                        <div className="text-xl pr-8">Subtotal</div>
                      </div>
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center mt-6 pt-6"
                        >
                          <div className="flex items-center">
                            <Image
                              src={item.images[0].link}
                              alt="Product"
                              width={20}
                              height={20}
                            />
                            <div className="flex flex-col ml-3">
                              <span className="md:text-md font-medium">
                                {item.name}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {/* Price */}
                            <div className="pr-8">
                              <span className="text-md font-medium">
                                {item.price}
                              </span>
                            </div>
                          </div>
                          <div className="pr-8">
                            {/* Quantity */}
                            {item.quantity}
                          </div>
                          <div className="justify-center">
                            {/* Subtotal */}
                            <div className="pr-8">
                              <span className="text-md font-medium text-red-500">
                                {item.quantity * item.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-between items-center mt-6 pt-6 border-t">
                        <div className="flex justify-center items-end">
                          <span className="text-lg font-medium text-gray-400 mr-1">
                            Shipping fee: $
                          </span>
                          <span className="text-lg font-bold text-gray-800">
                            {shippingFee}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-2">
              <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl">
                <div className="md:flex">
                  <div className="w-full px-5 py-2">
                    <form action="/order" method="post">
                      <div className="grid grid-cols-4 p-5">
                        <div className="flex text-red-500">
                          <h2 className="text-xl font-medium pr-8">
                            Payment method
                          </h2>
                        </div>
                        <div className="col-span-2">
                          <select name="payment_method" id="payment_method">
                            {paymentOptions.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 p-5">
                        <div className="col-span-3"></div>
                        <div>
                          <div className="text-lg font-medium mr-1">
                            <span className="text-gray-400">Bill total: </span>
                            <span className="font-bold">${totalPrice}</span>
                          </div>
                          <div className="text-lg font-medium mr-1">
                            <span className="text-gray-400">
                              Shipping Fee:{" "}
                            </span>
                            <span className="font-bold">${shippingFee}</span>
                          </div>
                          <div className="text-lg font-medium mr-1">
                            <span className="text-gray-400">
                              Total payment:
                            </span>
                            <span className="font-bold text-red-500">
                              ${totalPrice + shippingFee}
                            </span>
                          </div>
                          <div className="py-5">
                            <button type="submit" className="btn">
                              Place Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addaddress;
