import React, { useEffect, useState } from "react";
import Book from "../components/Book";

const Books = () => {
  const [val, setVal] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/book/get");
      const data = await res.json();
      setVal(data.message);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <h2 className="my-10 text-3xl font-semibold text-center">Books</h2>
      <Book val={val} />
    </div>
  );
};

export default Books;
