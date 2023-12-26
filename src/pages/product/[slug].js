import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Product } from "../../components/components";
import { useStateContext } from "@/context/StateContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getAllProducts, getProductById } from "@/utils/api";
import ProductReview from "../../components/components/ProductReview";
import Loading from "../../components/components/Loading";
import Link from "next/link";
const ProductDetail = ({ product, relatedProducts }) => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { qty, increaseQuantity, decreaseQuantity, addToCart } =
    useStateContext();
  // const product = products.find((product) => product.slug === parseInt(slug));
  useEffect(() => {
    setIsLoading(false);
  }, [product]);
  let stars = [];
  let maxScore = 5;
  for (let i = 1; i < product.average_rating / 2; i++) {
    stars.push(1);
  }
  for (let i = product.average_rating / 2; i < maxScore; i++) {
    stars.push(0);
  }
  const handleBuyNow = (product, quantity) => {
    const success = addToCart(product, quantity);
    if (success === 1) {
      router.push("/order");
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={product.images[index]?.link}
              alt={product.id}
              className="product-detail-image"
              style={{ width: "1800px" }}
            />
          </div>
          <div className="small-images-container">
            {product.images.map((item, i) => (
              <img
                key={i}
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
            {stars.map((item, key) =>
              item === 1 ? (
                <AiFillStar key={key} />
              ) : (
                <AiOutlineStar key={key} />
              )
            )}
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
            <button
              className="buy-now"
              onClick={() => handleBuyNow(product, qty)}
            >
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
      <div className="px-6 py-4 ">
        <Tabs defaultIndex={1}>
          <TabList>
            {["Description", "Information", "Reviews"].map((item, i) => (
              <Tab key={i}>
                <div className="px-10 font-mono ">{item}</div>
              </Tab>
            ))}
          </TabList>
          <TabPanel>
            <h2>{product.content}</h2>
          </TabPanel>
          <TabPanel>
            <h2 className="font-mono text-xl antialiased font-bold ">
              {product.name}
            </h2>
            <p>
              <span className="font-medium">Description</span> :{" "}
              {product.content}
            </p>
            <p>
              <span className="font-medium">Category</span>:{" "}
              {product?.category.name}
            </p>
          </TabPanel>
          <TabPanel>
            <div>
              <div className="product-detail-desc review-container">
                <div className="summary ">
                  <h3 className="inline-block price">Product Ratings</h3>
                  <Link
                    href={`/comment?product_id=${product.id}`}
                    className="px-3 py-2 mx-3 font-medium text-white bg-red-500 rounded-full hover:bg-red-600 "
                  >
                    Comment
                  </Link>
                </div>
                <div className="w-full product-rating-list md:max-w-7xl">
                  <div className="product-comment-list">
                    <div className="items-start w-full px-3 py-2">
                      {product.reviews.length > 0 &&
                        product.reviews.map(
                          ({ id, content, rating, user_email }) => (
                            <ProductReview
                              key={id}
                              content={content}
                              rating={rating}
                              username={user_email.substr(
                                0,
                                user_email.indexOf("@")
                              )}
                            />
                          )
                        )}
                      {product.reviews.length == 0 && (
                        <div className="flex justify-center py-5 mx-auto text-xl font-medium border-b border-black">
                          No comment
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const res = await getAllProducts();
  const paths = res.products.map((item) => ({
    params: { slug: item.id.toString() },
  }));

  return { paths, fallback: true };
}
