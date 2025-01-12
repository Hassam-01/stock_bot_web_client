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
import Footer from "../components/footer";

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
        `${process.env.REACT_APP_API_URL + endpoints}`,
        formData
      );
      if (isRegister) {
        // toast.success("Registered successfully!");
      } else {
        dispatch(setToken(response.data.token));
        toast.success("Logged in successfully!");
      }
      dispatch(setUsername(formData.username));
      dispatch(setUserId(response.data.id));
      if (isRegister) {
        // refresh window
        alert("Registered successfully! Please login now");

        // pause for 2 seconds
        setTimeout(() => {}, 700);

        window.location.reload();

        // show alert please login now
      } else {
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        // toast.error(error.response.data.message);
        setRoastMessage(error.response.data.message);
      } else {
        // toast.error("Something went wrong. Please try again.");
        setRoastMessage("Error !");
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
  const logintext = "Have an account? Login";
  const registertext = "Create an account! Register";
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
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
      <div className="relative w-[90%] max-w-4xl md:h-[85vh] h-[60vh] bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Toggle Section */}

        <div
          className={`hidden md:absolute md:top-0 h-full md:w-1/2 md:z-20 md:flex md:flex-col md:items-center md:justify-center md:bg-gradient-to-br from-purple-600 to-purple-800 md:text-white transition-transform duration-700 ease-in-out ${
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
          className={`absolute inset-y-0 left-0 md:w-1/2 bg-gray-900 flex flex-col justify-center items-center p-10 transform transition-transform duration-700 ease-in-out ${
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
            <div
              className="md:hidden text-center text-gray-400 mt-4 text-sm"
              onClick={() => {
                setIsRegister(!isRegister);
                setFormData({ username: "", password: "", email: "" });
              }}
            >
              {isRegister ? logintext:registertext}
            </div>
          </form>
        </div>

        {/* Register Section */}
        <div
          className={`absolute inset-y-0 right-0 md:w-1/2 bg-gray-900 flex flex-col justify-center items-center p-10 transform transition-transform duration-700 ease-in-out ${
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
            <div className="md:hidden text-center text-sm text-gray-400 mt-4" onClick={() => {
                setIsRegister(!isRegister);
                setFormData({ username: "", password: "", email: "" });
              }}>
          {isRegister ? 
            logintext:registertext}
        </div>
          </form>
        </div>
      </div>

      <div className="absolute md:relative -bottom-10 w-full">
        <Footer />
      </div>
    </div>
  );
}

export default Login;



// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setDashboardData } from '../features/dashboard/dashboardSlice';
// import Sidebar from '../components/sideBar';
// import AssetCard from '../components/assestCard';
// import ProfileCard from '../components/profileCard';
// import ActivityTable from '../components/activityTable';
// import axios from 'axios';
// import { toast} from 'react-toastify';

// function Home() {
//   const dispatch = useDispatch();
//   const [toastShown, setToastShown] = React.useState(false);
//   const userId = useSelector((state) => state.userId.userId);
//   // const userId = 1 ; 

// useEffect(() => {
//   const fetchData = async () => {
//     if(userId && !toast.isActive('login-toast') && !toastShown){
//       toast.success("Logged in successfully!", { toastId: 'login-toast' });
//     }
//     setToastShown(true);
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard/${userId}`);
//       // ! we are receiving total_investment and total_profit_loss from the server which is the balance
//       // balance = response.data.balance.total_investment + response.data.balance.total_profit_loss;
//       // assets is an array of object with tickers as keys: assets = { 'AAPL': { price: 123.45, stock_id: 1, quantity: 10, date: '2022-03-15' }, ... }
//       const assets = response.data.assets || []; // Default to an empty array if not present
//       dispatch(setDashboardData({ ...response.data, assets }));
//     } catch (err) {
//       console.error(err);
//     }
//   };
// // test line hello
// /// hi...
//   fetchData();
// }, [userId, dispatch]);  // Added userId to the dependency array to re-fetch if it changes

//   // getting from states  
//   const dataAssets = useSelector((state) => state.dashboard.assets); // all the data of of assets
//   const balance = useSelector((state) => state.dashboard.balance); // 
//   const date = useSelector((state) => state.dashboard.joined); // date of making profile
//   const userActivities = useSelector((state) => state.dashboard.activities); 
//   const username = useSelector((state) => state.username.username);
//   // const username = 'Hassam Ali';
//   // from the assets, filter unique tickers assets.ticker
//   const uniqueTickers = [...new Set(dataAssets.map((asset) => asset.ticker))];



//   //* data to be passed to profile card = username = useSelector(state.username.username), joinDate = date, assetsOwned = unique tickers, assetsTotal = balance;
//   const user = {
//     username: username,
//     profilePic: '/profile-pic.png',
//     joinDate: date,
//     assetsOwned:  uniqueTickers,
//     assetsTotal: balance,
//   };

//   // * data to be passed to asset card = name = asset.company_name, price = asset.price, icon = '/stock-icon.png';
//   const assets = Array.isArray(dataAssets)
//   ? dataAssets.flatMap((assetGroup) =>
//       assetGroup.assets.map((individualAsset) => ({
//         name: assetGroup.ticker, // Use the ticker as the name
//         price: individualAsset.price || 0, // Extract price
//         quantity: individualAsset.quantity || 0, // Extract quantity
//         stock_id: individualAsset.stock_id, // Extract stock_id

//       }))
//     )
//   : [];


  
//   // * data to be passed to activity table = activities = activities;
//   const activities = userActivities.map(activity => {
//     // Find the corresponding asset from dataAssets using stock_id
//     const matchingAsset = assets.find(asset => asset.stock_id === activity.stock_id)
//       // Getting the first element from the array, since flatMap returns an array.

//     return {
//       date: activity.transaction_date,
//       description: activity.transaction_type,
//       quantity: activity.quantity,
//       amount: Number(activity.price) * Number(activity.quantity),
//       ticker: matchingAsset ? matchingAsset.name : 'Unknown', // Use the matched ticker or 'Unknown' if not found
//     };
//   });
  