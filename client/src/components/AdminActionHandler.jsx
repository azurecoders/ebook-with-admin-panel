import React from "react";
import { useParams } from "react-router-dom";
import UpdateBook from "../pages/UpdateBook";
import UpdateCategory from "../pages/UpdateCategory";
import Sidebar from "./Sidebar";

const AdminActionHandler = () => {
  const params = useParams();
  return (
    <div className="flex min-h-[90vh] flex-col md:flex-row">
      <Sidebar />
      <div className="w-[100vw] md:w-[80vw] p-2 md:p-6">
        {params && params.subpage == "books" && params.action == "edit" && (
          <UpdateBook />
        )}
        {params && params.subpage == "category" && params.action == "edit" && (
          <UpdateCategory />
        )}
      </div>
    </div>
  );
};

export default AdminActionHandler;
