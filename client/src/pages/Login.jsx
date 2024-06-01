import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/userSlice/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));

      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="max-w-[1100px] mx-auto min-h-[90vh] flex justify-center items-center flex-col gap-10">
      <h2 className="text-3xl font-semibold text-center">Log In</h2>
      <form
        onSubmit={handleSubmit}
        className="p-5 w-[90%] md:w-[50%] lg:w-[40%]  rounded-lg border border-[#ccc] flex flex-col gap-10"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-xl font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
            className="border-b focus:border-b-black outline-none text-lg"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password" className="text-xl font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password..."
            className="border-b focus:border-b-black outline-none text-lg"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <p>Dont Have An Account?</p>
          <Link
            className="text-slate-700 hover:opacity-90 cursor-pointer"
            to="/sign-up"
          >
            Sign Up
          </Link>
        </div>
        {error && <p className="text-center text-sm text-red-700">{error}</p>}
        <button
          disabled={loading || formData.email == "" || formData.password == ""}
          className="border disabled:bg-[#ccc] border-[#ccc] rounded-md hover:border-black p-2 text-xl font-medium"
        >
          {loading ? "Loading..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
