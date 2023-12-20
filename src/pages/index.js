import { Stack, styled } from "@mui/material";
import React from "react";
import { banner } from "../data/data";
import {
  Product,
  FooterBanner,
  HeroBanner,
  FilterByCategory,
} from "./components";
import { getAllProducts } from "@/utils/api";
const StyledStack = styled(Stack)(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginTop: "20px",
  width: "100%",
  flexDirection: "row",
  borderRadius: "100px",
}));

const Home = ({ products }) => {
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
            <Product key={product.id} product={product}></Product>
          ))}
        </Stack>
      </StyledStack>
      <FooterBanner footerBanner={banner} />
    </>
  );
};

export default Home;

export async function getServerSideProps({ query }) {
  const name = query.name;
  try {
    let url = "http://127.0.0.1:8000/api/product/";
    if (name) {
      url += `?name=${encodeURIComponent(name)}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const searchData = await response.json();

    return {
      props: {
        products: searchData.products,
      },
    };
  } catch (error) {
    console.error("Error fetching search data:", error);

    return {
      props: {
        searchData: null,
        error: "Error fetching search data",
      },
    };
  }
}
