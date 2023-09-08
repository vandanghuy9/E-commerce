import React from "react";
import { products, banner } from "../data/data";
import { Product, FooterBanner, HeroBanner } from "./components";
const Home = () => {
  return (
    <>
      <HeroBanner heroBanner={banner} />
      <div className="products-heading">
        <h2>Best selling</h2>
        <p>Speaker</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
      <FooterBanner footerBanner={banner} />
    </>
  );
};

export default Home;
