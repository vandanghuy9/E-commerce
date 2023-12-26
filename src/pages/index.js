import { Stack, styled, Scrollbar, Typography } from "@mui/material";
var BASE_URL = process.env.BASE_URL;
import React, { useEffect, useState } from "react";
import { banner } from "../data/data";
import { Product, FooterBanner, HeroBanner } from "../components/components";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useStateContext } from "@/context/StateContext";
import { set } from "react-hook-form";

const StyledStack = styled(Stack)(() => ({
  display: "flex",
  flexWrap: "wrap",
  direction: "row",
  justifyContent: "space-between",
  marginTop: "20px",
  width: "100%",
  flexDirection: "row",
  borderRadius: "100px",
}));

// const StyledScrollbar = styled(Scrollbar)(() => ({
//   maxHeight: 200,
//   "& .MuiPaper-root": {
//     borderRadius: 8,
//   },
// }));

const Home = ({ products, category }) => {
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
  const { searchValue } = useStateContext();

  const [displayProduct, setDisplayProduct] = useState(products);

  const handleChange = (category) => {
    setDisplayProduct(products);
    if (category !== "All") {
      setDisplayProduct((prevProducts) =>
        prevProducts.filter((item) => item.category.name === category)
      );
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchValue.trim() === "") {
        setDisplayProduct(products);
      } else {
        const filteredProducts = products.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setDisplayProduct(filteredProducts);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue, products]);

  return (
    <>
      <HeroBanner heroBanner={banner} />
      <div className="products-heading">
        <h2>Best selling</h2>
        <p>Speaker</p>
      </div>
      <StyledStack>
        <List
          sx={{
            width: "18%",
            marginRight: "20px",
            height: "100%",
            gap: "12px",
            maxHeight: "500px",
            overflow: "auto",
            borderRadius: "20px",
            border: "1px solid #f0f0f0",
            boxShadow: "0px 0px 10px #f0f0f0",
          }}
        >
          {category?.map((item) => (
            <ListItem key={item.id}>
              <ListItemButton
                sx={{ borderRadius: "100px" }}
                onClick={() => handleChange(item.name)}
              >
                <ListItemText
                  sx={{ fontSize: "18px", fontWeight: "500" }}
                  disableTypography
                  primary={item.name}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Stack
          sx={{
            width: "80%",
          }}
          direction="row"
          flexWrap="wrap"
          gap="20px"
          maxHeight={800}
          overflow="auto"
        >
          {displayProduct?.map((product) => (
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
    let url = `${BASE_URL}/product/`;
    if (name) {
      url += `?name=${encodeURIComponent(name)}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const searchData = await response.json();

    let category = [];
    const categoryResponse = await fetch(`${BASE_URL}/category/`);
    if (categoryResponse.ok) {
      category = await categoryResponse.json();
    } else {
      throw new Error("Network response for categories was not ok");
    }

    return {
      props: {
        products: searchData.products,
        category: category.categories,
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
