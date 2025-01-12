import React from "react";
import { FaHome, FaCoins, FaChartLine, FaComments, FaFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUserId } from "../features/userID/userIdSlice"; // Assuming you clear the user state on logout
import { useNavigate } from "react-router-dom"; // For navigation to the login page
import { logout } from "../features/authentication/authSlice";

function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear Redux state
    dispatch(setUserId(""));

    // Clear any authentication tokens (if stored in localStorage)
    dispatch(logout());
    // Redirect to the login page
    navigate("/");
  };

  const menuItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "Assets", icon: <FaCoins /> },
    { name: "Live Trade", icon: <FaChartLine /> },
    { name: "Forum", icon: <FaComments /> },
    { name: "Reports", icon: <FaFileAlt /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  return (
    <aside className="bg-gradient-to-b from-purple-50 to-white shadow-lg w-64 p-6 flex flex-col justify-between h-full ">
      {/* Header Section */}
      <div>
        <div className="md:text-center md:mb-16 mb-8 ml-8 items-center md:mt-0 md:ml-0 -mt-1">
          <h2 className="text-2xl font-bold text-purple-700 tracking-widest">Menu Board</h2>
        </div>
        <nav className="md:space-y-4 space-y-8">
          {menuItems.map(({ name, icon }) => (
            <button
              key={name}
              className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-purple-700 hover:bg-purple-100 font-medium px-4 py-2 rounded-lg transition-all"
            >
              <span className="text-purple-600 text-lg">{icon}</span>
              {name}
            </button>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left text-red-600 hover:text-red-700 hover:bg-red-100 font-medium px-4 py-2 rounded-lg transition-all"
          >
            <span className="text-red-600 text-lg">
              <FaSignOutAlt />
            </span>
            Logout
          </button>
        </nav>
      </div>

      {/* Footer Section */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>&copy; 2025 TeamSastaAI</p>
      </div>
    </aside>
  );
}

export default SideBar;
