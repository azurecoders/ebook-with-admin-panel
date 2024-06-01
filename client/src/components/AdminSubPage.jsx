import React from "react";
import { useParams } from "react-router-dom";
import AdminShowBooks from "../pages/AdminShowBooks";
import AdminShowCategory from "../pages/AdminShowCategory";
import Sidebar from "./Sidebar";

const AdminSubPage = () => {
  const params = useParams();
  return (
    <div className="flex min-h-[90vh] flex-col md:flex-row">
      <Sidebar />
      <div className="w-[100vw] md:w-[80vw] p-2 md:p-6">
        {params && params.subpage == "books" && <AdminShowBooks />}
        {params && params.subpage == "category" && <AdminShowCategory />}
      </div>
    </div>
  );
};

export default AdminSubPage;
