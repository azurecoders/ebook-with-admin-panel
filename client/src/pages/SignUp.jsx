import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validPwd, setValidPwd] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePassword = (e) => {
    setValidPwd(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      if (!validPwd) {
        setError("Choose a strong password");
      }
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);

      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="max-w-[1100px] mx-auto min-h-[90vh] flex justify-center items-center flex-col gap-10">
      <h2 className="text-3xl font-semibold text-center">Sign Up</h2>
      <form
        onSubmit={handleSubmit}
        className="p-5 w-[90%] md:w-[50%] lg:w-[40%]  rounded-lg border border-[#ccc] flex flex-col gap-10"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="username" className="text-xl font-semibold">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username..."
            className="border-b focus:border-b-black outline-none text-lg"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>
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
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
          />
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital"]}
            minLength={8}
            value={formData.password}
            onChange={handlePassword}
          />
        </div>
        <div className="flex justify-between">
          <p>Already Have An Account?</p>
          <Link
            className="text-slate-700 hover:opacity-90 cursor-pointer"
            to="/login"
          >
            Log In
          </Link>
        </div>
        {error && <p className="text-center text-sm text-red-700">{error}</p>}
        <button
          disabled={
            loading ||
            formData.username == "" ||
            formData.email == "" ||
            formData.password == "" ||
            !validPwd
          }
          className="border border-[#ccc] rounded-md hover:border-black disabled:bg-[#ddd] p-2 text-xl font-medium"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
