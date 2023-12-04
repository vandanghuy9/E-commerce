import React from "react";
import Link from "next/link";
import Image from "next/image";
const Product = ({ product }) => {
  return (
    <div>
      <Link href={`/product/{product.id}`}>
        <div className="product-card">
          <Image
            src={product?.images[0]?.image.replace(
              "/media/product_images/",
              "/banner/assets/"
            )}
            alt={product.name}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price"> $ {product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
