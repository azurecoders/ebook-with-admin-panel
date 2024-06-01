import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import CreateBook from "../pages/CreateBook";
import CreateCategory from "../pages/CreateCategory";

const AdminActionPage = () => {
  const params = useParams();
  return (
    <div className="flex min-h-[90vh] flex-col md:flex-row">
      <Sidebar />
      <div className="w-[100vw] md:w-[80vw] p-2 md:p-6">
        {params && params.subpage == "books" && params.action == "create" && (
          <CreateBook />
        )}
        {params &&
          params.subpage == "category" &&
          params.action == "create" && <CreateCategory />}
      </div>
    </div>
  );
};

export default AdminActionPage;
