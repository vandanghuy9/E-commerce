import React from "react";
const YourComponent = ({ product, billId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // try {
    //     const response = await axios.post(/api/review/store, {
    //         billId: billId,
    //         productId: productId,
    //         comment: comment,
    //         rating: rating
    //     });

    //     console.log('Review submitted:', response.data);
    // } catch (error) {
    //     console.error('Error submitting review:', error);
    // }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
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
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="point"
          >
            Rating (0-10)
          </label>
          <input
            type="number"
            name="point"
            id="point"
            min="0"
            max="10"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
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

export default YourComponent;
