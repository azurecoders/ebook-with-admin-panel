import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOutSuccess } from "../redux/userSlice/userSlice";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await fetch("/api/user/logout");

      const data = await res.json();

      if (data.success == false) {
        toast.error(`${data.message}`, {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      toast.success("Log Out Successful", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        dispatch(logOutSuccess());
        navigate("/login");
      }, 1500);
    } catch (error) {}
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
      <nav className="bg-slate-100">
        <header className="flex justify-between max-w-[1100px] mx-auto items-center h-[10vh] p-3">
          <div className="text-md md:text-2xl font-bold">
            <Link to="/">Online Library</Link>
          </div>
          <ul className="flex gap-5 text-lg text-slate-700 hover:opacity-90 cursor-pointer">
            <li>
              <Link className="text-sm md:text-lg" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-sm md:text-lg" to="/books">
                Books
              </Link>
            </li>
            {currentUser && currentUser.q3Mk39yttK && (
              <li>
                <Link className="text-sm md:text-lg" to="/admin/dashboard">
                  Admin Panel
                </Link>
              </li>
            )}
            {currentUser ? (
              <li onClick={handleLogOut}>
                <Link className="text-sm md:text-lg">LogOut</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link className="text-sm md:text-lg" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="text-sm md:text-lg" to="/sign-up">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </header>
      </nav>
    </>
  );
};

export default Navbar;
