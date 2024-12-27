import React, { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUsername } from "../features/username/usernameSlice";
import { setUserId } from "../features/userID/userIdSlice";
import { useNavigate } from "react-router";
import { setToken } from "../features/authentication/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [roastMessage, setRoastMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoints = isRegister ? "/auth/register" : "/auth/login";
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL+endpoints}`,
        formData
      );

      if (!isRegister) {
        toast.success("Registered successfully!");
      } else {
        dispatch(setToken(response.data.token));
        toast.success("Logged in successfully!");
      }
      dispatch(setUsername(formData.username));
      dispatch(setUserId(response.data.id));
      navigate("/home");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        setRoastMessage(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
        setRoastMessage("Are you even trying? Fix this and try again!");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const clearRoastMessage = () => {
    setRoastMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      {/* Roast Container */}
      {roastMessage && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center justify-between">
            <p>{roastMessage}</p>
            <button
              onClick={clearRoastMessage}
              className="ml-4 bg-red-700 px-2 py-1 rounded-lg hover:bg-red-800 transition"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="relative w-[90%] max-w-4xl h-[85vh] bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Toggle Section */}
        <div
          className={`absolute top-0 h-full w-1/2 z-20 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800 text-white transition-transform duration-700 ease-in-out ${
            !isRegister ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="text-center px-6">
            <h3 className="text-3xl font-bold mb-4">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </h3>
            <p className="text-lg">
              {isRegister
                ? "Login and continue your journey!"
                : "Join us today and unlock exclusive benefits!"}
            </p>
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setFormData({ username: "", password: "", email: "" });
              }}
              className="mt-6 px-6 py-3 bg-white text-purple-800 font-bold rounded-lg hover:bg-gray-100 transition"
            >
              {isRegister ? "Go to Login" : "Go to Register"}
            </button>
          </div>
        </div>

        {/* Login Section */}
        <div
          className={`absolute inset-y-0 left-0 w-1/2 bg-gray-900 flex flex-col justify-center items-center p-10 transform transition-transform duration-700 ease-in-out ${
            isRegister ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          <p className="text-gray-400 mb-6 text-center">
            Enter your details to log in to your account.
          </p>
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Login Now
            </button>
          </form>
        </div>

        {/* Register Section */}
        <div
          className={`absolute inset-y-0 right-0 w-1/2 bg-gray-900 flex flex-col justify-center items-center p-10 transform transition-transform duration-700 ease-in-out ${
            isRegister ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Register</h2>
          <p className="text-gray-400 mb-6 text-center">
            Create an account to get started.
          </p>
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Register Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
