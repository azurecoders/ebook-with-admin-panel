import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BookDetails = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const [val, setVal] = useState();
  const [imgNumber, setImgNumber] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/book/fetch/${id}`);
      const data = await res.json();

      setVal(data.message);
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex w-[100%] p-5 gap-3 justify-center flex-wrap relative">
      <div className="fixed bottom-10 right-10 h-[400px] w-[300px] border rounded-md shadow-md hover:shadow-lg bg-slate-100 p-4 flex flex-col">
        <div>
          {val && val.type == "simple" && (
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold">Price:</span>
              <h3 className="text-2xl font-semibold">${val && val.price}</h3>
            </div>
          )}
          {val && val.type == "offer" && (
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold">Price:</span>
              <span className="text-md font-semibold line-through text-gray-700">
                ${val && val.realPrice}
              </span>
              <span className="text-2xl font-semibold">
                ${val && val.realPrice - val.discountPrice}
              </span>
            </div>
          )}
        </div>
        <div className="w-[100%] h-[1px] bg-[#ccc] my-4"></div>
        <div className="flex-grow">
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold">Category:</span>
            <span className="text-2xl font-medium">{val && val.category}</span>
          </div>
        </div>
        <div className="flex flex-col text-center gap-3 w-[100%] justify-center items-center">
          <button disabled={!currentUser} className="w-[100%]">
            <Link className="rounded-md hover:opacity-90 hover:bg-[#ddd] border disabled:bg-[#ccc] disabled:border-black border-[#ccc] py-2 px-4 text-lg w-[100%] disabled:text-[#000]">
              Add to Cart
            </Link>
          </button>
          <button
            disabled={!currentUser}
            className="rounded-md hover:opacity-90 hover:bg-[#ddd] border disabled:bg-[#ccc] disabled:border-black border-[#ccc] py-2 px-4 text-lg w-[100%] disabled:text-[#000]"
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-w-[90vw] md:min-w-[30vw]">
        <div className="h-[300px]">
          <img
            src={val && val.imgUrls[imgNumber]}
            className="h-[100%] rounded-md hover:opacity-90 cursor-pointer"
            alt=""
          />
        </div>
        <div className="flex w-[100%] justify-around items-center my-3">
          {val &&
            val.imgUrls.map((img, index) => (
              <div className="h-[80px] w-[80px]">
                <img
                  src={img}
                  alt=""
                  onClick={() => setImgNumber(index)}
                  className="rounded-sm hover:opacity-90 cursor-pointer w-[100%] h-[100%]"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="border min-w-[90vw] md:min-w-[60vw] md:max-w-[60vw] p-5 flex flex-col gap-3">
        <h3 className="text-2xl font-semibold">{val && val.title}</h3>
        <h3 className="text-2xl font-semibold">{val && val.author}</h3>
        <p className="text-slate-900 text-md">{val && val.description}</p>
      </div>
    </div>
  );
};

export default BookDetails;
