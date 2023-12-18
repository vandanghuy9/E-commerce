import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../components";
import { useStateContext } from "@/context/StateContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getAllProducts, getProductById } from "@/utils/api";
const ProductDetail = ({ product, relatedProducts }) => {
  const [index, setIndex] = useState(0);
  const { qty, increaseQuantity, decreaseQuantity, addToCart } =
    useStateContext();
  // const product = products.find((product) => product.slug === parseInt(slug));
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={product.images[index]?.link}
              alt={product.id}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {product.images.map((item, i) => (
              <img
                src={item?.link}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{product.name}</h1>
          <div className="reviews">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <p>{product.average_rating}</p>
          </div>
          <h4>Details: </h4>
          <p>{product.content}</p>
          <p className="price"> $ {product.price}</p>
          <div className="quantity">
            <h3>Quantity</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQuantity}>
                -
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={increaseQuantity}>
                +
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              className="add-to-cart"
              onClick={() => addToCart(product, qty)}
            >
              Add to cart
            </button>
            <button className="buy-now" onClick={() => {}}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {relatedProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <div className="border border-black border-solid px-6 py-4 ">
        <Tabs defaultIndex={1}>
          <TabList>
            {["Description", "Information", "Reviews"].map((item, i) => (
              <Tab key={i}>
                <div className=" px-10 font-mono">{item}</div>
              </Tab>
            ))}
          </TabList>

          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;

export async function getStaticProps({ params }) {
  let relatedProducts = await getAllProducts();
  let product = await getProductById(params.slug);
  return {
    props: {
      product: product.product,
      relatedProducts: relatedProducts.products,
    },
  };
}

export async function getStaticPaths() {
  const res = await getAllProducts();
  const paths = res.products.map((item) => ({
    params: { slug: item.id.toString() },
  }));

  return { paths, fallback: false };
}
