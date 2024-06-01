import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminShowCategory = () => {
  const [val, setVal] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/category/get");
      const data = await res.json();
      setVal(data.message);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/category/delete/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setVal(data.books);
  };
  return (
    <>
      <div className="flex justify-between w-[100%]">
        <h3 className="text-2xl font-semibold">Categories</h3>
        <Link
          to="create"
          className="border border-[#ccc] rounded-md hover:border-black text-lg py-2 px-4"
        >
          Create
        </Link>
      </div>
      {val && val.length == 0 && (
        <h3 className="text-xl font-semibold">No Categories Found</h3>
      )}
      <div>
        {val &&
          val.map((category) => (
            <div
              key={category._id}
              className="flex justify-between p-3 items-center border my-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer border-[#ccc] hover:border-black transition-all flex-wrap md:flex-row text-center gap-3 md:gap-0"
            >
              <div className="h-[100%] w-[100%] md:w-[150px] rounded-md overflow-hidden">
                <img
                  src={category.imgUrls[0]}
                  alt={category.title}
                  h="100"
                  w="150"
                />
              </div>
              <div className="flex flex-col text-center gap-1 w-[100%] md:w-fit">
                <Link
                  to={`/category/${category.title}`}
                  className="text-lg font-medium hover:underline"
                >
                  {category.title}
                </Link>
              </div>
              <div className="flex gap-2 items-center w-[100%] md:w-fit justify-center">
                <Link
                  className="text-blue-700 cursor-pointer hover:opacity-90"
                  to={`edit/${category._id}`}
                >
                  Edit
                </Link>
                <span
                  onClick={() => handleDelete(category._id)}
                  className="text-red-700 cursor-pointer hover:opacity-90"
                >
                  Delete
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AdminShowCategory;
