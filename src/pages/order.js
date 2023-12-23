import React from "react";
import { FiUser } from "react-icons/fi";
import Image from "next/image";
import { useStateContext } from "@/context/StateContext";
import { useRouter } from "next/router";

const Order = () => {
  //data
  const router = useRouter();

  const handleCheckout = (e) => {
    router.push("/addaddress");
  };
  const { cartItems, totalPrice, totalQuantities, qty, showCart } =
    useStateContext();
  const shippingFee = totalPrice / 2;
  const paymentOptions = ["payment after shipping", "online payment"];

  return (
    <div>
      <div className="pt-12 pb-2">
        <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl">
          <div className="md:flex-col">
            <div className="w-full px-5 py-2">
              <div className="p-5">
                <div className="flex gap-2 text-red-500 ">
                  <FiUser className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-medium ">Address</h2>
                <div className="py-5 items-center ">
                  <div className="grid grid-cols-4 text-base gap-2 relative">
                    <span className="font-bold">Name</span>
                    <span className="mx-4 break-all col-span-2">Address</span>
                  </div>
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
                            <button
                              type="button"
                              className="btn"
                              onClick={handleCheckout}
                            >
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

export default Order;
