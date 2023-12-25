import { useState } from "react";
import { useStateContext } from "@/context/StateContext";
const Review = ({ product }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { commentForProduct } = useStateContext();
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

  return (
    <div>
      <h1 className="font-semibold text-center text-xl text-gray-800 dark:text-gray-200 leading-tight my-3">
        Comment for {product.name}
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
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
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
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
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
    let url = `http://127.0.0.1:8000/api/product/${id}`;
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
