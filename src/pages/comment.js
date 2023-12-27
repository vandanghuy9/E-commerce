var BASE_URL = process.env.BASE_URL;
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { useStateContext } from "@/context/StateContext";
import { useRouter } from "next/router";

const Review = ({ product }) => {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { commentForProduct } = useStateContext();
  const { checkLogin } = useUserContext();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(comment, rating, sessionStorage.getItem("user"));
    commentForProduct({
      content: comment,
      rating: rating,
      product_id: product.id,
      user: sessionStorage.getItem("user"),
    });
  };
  useEffect(() => {
    if (checkLogin() === false) {
      router.push("/signin");
    }
  }, []);
  return (
    <div>
      <h1 className="my-3 text-xl font-semibold leading-tight text-center text-gray-800 dark:text-gray-200">
        Comment for {product.name}
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="comment"
          >
            Comment
          </label>
          <textarea
            name="comment"
            rows="4"
            cols="50"
            placeholder="Enter your comment"
            value={comment}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="rating"
          >
            Rating (0-10)
          </label>
          <input
            type="number"
            name="rating"
            id="point"
            min="0"
            max="10"
            value={rating}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
};

export default Review;

export async function getServerSideProps({ query }) {
  const id = query.product_id;
  try {
    let url = `${BASE_URL}/product/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const searchData = await response.json();

    return {
      props: {
        product: searchData.product,
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
