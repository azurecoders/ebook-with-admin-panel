import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="w-[100vw] md:w-[20vw] bg-slate-200 text-center p-3">
      <h2 className="font-semibold text-3xl my-5">Admin Panel</h2>
      <p className="font-medium text-lg">{currentUser.username}</p>
      <p className="font-medium text-lg">{currentUser.email}</p>
      <div className="my-5 flex flex-col gap-5">
        <Link
          className="w-[100%] bg-blue-700 text-white text-lg p-2 rounded-md hover:opacity-90 cursor-pointer"
          to="/admin/dashboard"
        >
          Dashboard
        </Link>

        <Link
          className="w-[100%] bg-blue-700 text-white text-lg p-2 rounded-md hover:opacity-90 cursor-pointer"
          to="/admin/books"
        >
          Books
        </Link>

        <Link
          className="w-[100%] bg-blue-700 text-white text-lg p-2 rounded-md hover:opacity-90 cursor-pointer"
          to="/admin/category"
        >
          Category
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
