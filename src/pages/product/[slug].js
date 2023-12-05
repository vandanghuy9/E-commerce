import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../components";
import { useStateContext } from "@/context/StateContext";
const ProductDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [index, setIndex] = useState(0);
  const { qty, increaseQuantity, decreaseQuantity, addToCart, products } =
    useStateContext();
  const product = products.find((product) => product.slug === parseInt(slug));
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={product.image[index]}
              alt={slug}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {product.image.map((item, i) => (
              <img
                src={item}
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
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{product.details}</p>
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
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
