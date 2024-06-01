import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Book = ({ val }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex justify-center flex-wrap min-h-[90vh] gap-10 pb-10">
      {val &&
        val.map((book) => (
          <Link
            to={`/book/${book._id}`}
            key={book._id}
            className="max-w-[300px] h-fit border border-[#ccc] shadow-md hover:shadow-lg p-4 rounded-md cursor-pointer"
          >
            <div className="w-[100%] h-[100%] relative">
              {book.type == "offer" && (
                <div className="absolute right-3 top-5">
                  <span className="bg-blue-700 text-white py-2 px-4 rounded-full">
                    Discounted
                  </span>
                </div>
              )}
              <img
                src={book.imgUrls[0]}
                alt={book.title}
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col gap-5 mt-2">
              <h3 className="text-xl font-medium">
                <span className="font-semibold hover:underline">
                  {book.title}
                </span>
                {" by "}
                <Link
                  to={`/author/${book.author}`}
                  className="font-semibold hover:underline"
                >
                  {book.author}
                </Link>
              </h3>
              <Link
                to={`/category/${book.category}`}
                className="text-md font-medium hover:underline"
              >
                {book.category}
              </Link>
              <h3 className="font-semibold text-xl">
                {book.type == "simple" ? (
                  <span className="">${book.price}</span>
                ) : (
                  <div className="flex gap-3 w-[100%] items-center">
                    <span className="line-through text-sm text-gray-600">
                      ${book.realPrice}
                    </span>
                    <span>{book.realPrice - book.discountPrice}</span>
                  </div>
                )}
              </h3>
            </div>
            <div className="flex flex-wrap mt-auto min-w-[100%]">
              <Link
                to={`/book/${book._id}`}
                className="text-center w-[100%] py-2 px-4 mt-3 border rounded-md shadow-md hover:shadow-lg cursor-pointer"
              >
                View More
              </Link>
              {currentUser && currentUser.q3Mk39yttK && (
                <Link
                  to={`/admin/books/edit/${book._id}`}
                  className="w-[100%] py-2 px-4 mt-1 border rounded-md shadow-md hover:shadow-lg cursor-pointer text-center"
                >
                  Edit
                </Link>
              )}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Book;
