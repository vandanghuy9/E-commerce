import { Stack, styled } from "@mui/material";
import React, { useState, useEffect } from "react";
import { products, banner } from "../data/data";
import {
  Product,
  FooterBanner,
  HeroBanner,
  FilterByCategory,
} from "./components";
import { getProductData } from "../api";

const StyledStack = styled(Stack)(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginTop: "20px",
  width: "100%",
  flexDirection: "row",
  borderRadius: "100px",
}));

const Home = () => {
  const data = [
    {
      id: 1,
      title: "All",
    },
    {
      id: 2,
      title: "Sport",
    },
    {
      id: 3,
      title: "Music",
    },
    {
      id: 4,
      title: "Food and Drink",
    },
  ];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getProductData();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <HeroBanner heroBanner={banner} />
      <div className="products-heading">
        <h2>Best selling</h2>
        <p>Speaker</p>
      </div>
      <StyledStack>
        <FilterByCategory data={data} />
        <Stack
          sx={{
            width: "80%",
          }}
          direction="row"
          flexWrap="wrap"
          gap="20px"
        >
          {products?.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </Stack>
      </StyledStack>
      <FooterBanner footerBanner={banner} />
    </>
  );
};

export default Home;
