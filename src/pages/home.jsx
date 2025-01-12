import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardData } from "../features/dashboard/dashboardSlice";
import Sidebar from "../components/sideBar";
import AssetCard from "../components/assestCard";
import ProfileCard from "../components/profileCard";
import ActivityTable from "../components/activityTable";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBars, FaUser } from "react-icons/fa"; // Import the icons

function Home() {
  const dispatch = useDispatch();
  const [toastShown, setToastShown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar
  const [profileOpen, setProfileOpen] = useState(false); // State to toggle profile
  const userId = useSelector((state) => state.userId.userId);

  useEffect(() => {
    const fetchData = async () => {
      if (userId && !toast.isActive("login-toast") && !toastShown) {
        toast.success("Logged in successfully!", { toastId: "login-toast" });
      }
      setToastShown(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/dashboard/${userId}`
        );
        const assets = response.data.assets || [];
        dispatch(setDashboardData({ ...response.data, assets }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [userId, dispatch]);

  const dataAssets = useSelector((state) => state.dashboard.assets);
  const balance = useSelector((state) => state.dashboard.balance);
  const date = useSelector((state) => state.dashboard.joined);
  const userActivities = useSelector((state) => state.dashboard.activities);
  const username = useSelector((state) => state.username.username);
  const uniqueTickers = [...new Set(dataAssets.map((asset) => asset.ticker))];

  const user = {
    username,
    profilePic: "/profile-pic.png",
    joinDate: date,
    assetsOwned: uniqueTickers,
    assetsTotal: balance,
  };

  const assets = Array.isArray(dataAssets)
    ? dataAssets.flatMap((assetGroup) =>
        assetGroup.assets.map((individualAsset) => ({
          name: assetGroup.ticker,
          price: individualAsset.price || 0,
          quantity: individualAsset.quantity || 0,
          stock_id: individualAsset.stock_id,
        }))
      )
    : [];

  const activities = userActivities.map((activity) => {
    const matchingAsset = assets.find(
      (asset) => asset.stock_id === activity.stock_id
    );
    return {
      date: activity.transaction_date,
      description: activity.transaction_type,
      quantity: activity.quantity,
      amount: Number(activity.price) * Number(activity.quantity),
      ticker: matchingAsset ? matchingAsset.name : "Unknown",
    };
  });

  return (
    <div className="dashboard-container bg-purple-50 h-screen flex flex-col md:flex-row md:p-8 relative">
      <div
        className={`sidebar-container fixed inset-y-0 left-0 z-30 bg-white w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64`}
      >
        <Sidebar className="h-full" />
      </div>

      <div className="md:hidden w-full fixed z-20 text-purple-600 h-fit bg-white shadow-lg flex justify-between items-center p-4">
        <button
          className=""
          onClick={() => {
            if (profileOpen) {
              setProfileOpen(!profileOpen);
              setSidebarOpen(!sidebarOpen);
            } else {
              setSidebarOpen(!sidebarOpen);
            }
          }}
        >
          <FaBars size={24} />
        </button>
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>
        <button
          className=""
          onClick={() => {
            if (sidebarOpen) {
              setSidebarOpen(!sidebarOpen);
              setProfileOpen(!profileOpen);
            } else {
              setProfileOpen(!profileOpen);
            }
          }}
        >
          <FaUser size={24} />
        </button>
      </div>

      <main
        className={`flex-1 p-4 mt-16 md:mt-0 transition-opacity duration-300 ${
          sidebarOpen || profileOpen ? "opacity-50" : "opacity-100"
        }`}
      >
        <header className="hidden md:flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        </header>

        <section className="mb-8 w-fit">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Assets</h2>
          <div
            className="grid grid-flow-col auto-cols-max gap-6 overflow-x-auto"
            style={{
              maxHeight: "400px",
              display: "grid",
              gridTemplateRows: "repeat(2, 1fr)",
              gridAutoFlow: "column",
            }}
          >
            {assets.length > 0 ? (
              assets.map((asset) => (
                <AssetCard key={asset.stock_id} asset={asset} />
              ))
            ) : (
              "No assets found"
            )}

          </div>
        </section>

        <ActivityTable activities={activities} />
      </main>
      <div
        className={`profile-container p-4 fixed inset-y-0 right-0 z-30 bg-white w-64 transform ${
          profileOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64`}
      >
        <ProfileCard user={user} />
      </div>
      {(sidebarOpen || profileOpen) && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20"
          onClick={() => {
            setSidebarOpen(false);
            setProfileOpen(false);
          }}
        ></div>
      )}
    </div>
  );
}

export default Home;
