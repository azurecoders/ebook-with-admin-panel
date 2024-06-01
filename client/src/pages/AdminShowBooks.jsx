import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminDisplay from "../components/AdminDisplay";

const AdminShowBooks = () => {
  const [val, setVal] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/book/get");
      const data = await res.json();
      setVal(data.message);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/book/delete/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setVal(data.books);
  };
  return (
    <>
      <div className="flex justify-between w-[100%]">
        <h3 className="text-2xl font-semibold">Books</h3>
        <Link
          to="create"
          className="border border-[#ccc] rounded-md hover:border-black text-lg py-2 px-4"
        >
          Create
        </Link>
      </div>
      {val && val.length == 0 ? (
        <h3 className="text-xl font-semibold">No Books Found</h3>
      ) : (
        <AdminDisplay data={val} handleDelete={handleDelete} />
      )}
    </>
  );
};

export default AdminShowBooks;
