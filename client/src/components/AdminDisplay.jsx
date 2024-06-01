import React from "react";
import { Link } from "react-router-dom";

const AdminDisplay = ({ data, handleDelete }) => {
  console.log(data);
  return (
    <div>
      {data &&
        data.map((book) => (
          <div
            key={book._id}
            className="flex justify-between p-3 items-center border my-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer border-[#ccc] hover:border-black transition-all flex-wrap md:flex-row text-center gap-3 md:gap-0"
          >
            <div className="h-[100%] w-[100%] md:w-[150px] rounded-md overflow-hidden">
              <img src={book.imgUrls[0]} alt={book.title} />
            </div>
            <div className="flex flex-col text-center gap-1 w-[100%] md:w-fit">
              <Link
                to={`/book/${book._id}`}
                className="text-lg font-medium hover:underline"
              >
                {book.title}
              </Link>
              <Link
                to={`/author/${book.author}`}
                className="text-lg font-medium hover:underline"
              >
                {book.author}
              </Link>
              <Link
                to={`/category/${book.category}`}
                className="text-lg font-medium hover:underline"
              >
                {book.category}
              </Link>
            </div>
            <div className="flex flex-col gap-1 items-center w-[100%] md:w-fit">
              <h4 className="font-semibold text-lg">
                {book.type == "simple" ? (
                  <span>$ {book.price}</span>
                ) : (
                  <div className="flex gap-3 w-[100%] items-center">
                    <span className="line-through text-sm text-gray-600">
                      ${book.realPrice}
                    </span>
                    <span>{book.realPrice - book.discountPrice}</span>
                  </div>
                )}
              </h4>
              <div className="flex gap-2">
                <Link
                  className="text-blue-700 cursor-pointer hover:opacity-90"
                  to={`edit/${book._id}`}
                >
                  Edit
                </Link>
                <span
                  onClick={() => handleDelete(book._id)}
                  className="text-red-700 cursor-pointer hover:opacity-90"
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AdminDisplay;
