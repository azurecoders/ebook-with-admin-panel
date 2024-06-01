import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Book from "../components/Book";

const Author = () => {
  const { author } = useParams();
  const [val, setVal] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/book/author/${author}`);
      const data = await res.json();

      setVal(data.message);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="my-10 text-3xl font-semibold text-center">
        Books By Author
      </h2>
      <Book val={val} />
    </div>
  );
};

export default Author;
