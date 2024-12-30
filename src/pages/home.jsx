import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDashboardData } from '../features/dashboard/dashboardSlice';
import Sidebar from '../components/sideBar';
import AssetCard from '../components/assestCard';
import ProfileCard from '../components/profileCard';
import ActivityTable from '../components/activityTable';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function Home() {
  const dispatch = useDispatch();
  const [toastShown, setToastShown] = React.useState(false);
  const userId = useSelector((state) => state.userId.userId);
  // const userId = 1 ; 

useEffect(() => {
  const fetchData = async () => {
    if(userId && !toast.isActive('login-toast') && !toastShown){
      toast.success("Logged in successfully!", { toastId: 'login-toast' });
    }
    setToastShown(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard/${userId}`);
      // ! we are receiving total_investment and total_profit_loss from the server which is the balance
      // balance = response.data.balance.total_investment + response.data.balance.total_profit_loss;
      // assets is an array of object with tickers as keys: assets = { 'AAPL': { price: 123.45, stock_id: 1, quantity: 10, date: '2022-03-15' }, ... }
      const assets = response.data.assets || []; // Default to an empty array if not present
      dispatch(setDashboardData({ ...response.data, assets }));
    } catch (err) {
      console.error(err);
    }
  };
// test line hello
/// hi...
  fetchData();
}, [userId, dispatch]);  // Added userId to the dependency array to re-fetch if it changes

  // getting from states  
  const dataAssets = useSelector((state) => state.dashboard.assets); // all the data of of assets
  const balance = useSelector((state) => state.dashboard.balance); // 
  const date = useSelector((state) => state.dashboard.joined); // date of making profile
  const userActivities = useSelector((state) => state.dashboard.activities); 
  const username = useSelector((state) => state.username.username);
  // const username = 'Hassam Ali';
  // from the assets, filter unique tickers assets.ticker
  const uniqueTickers = [...new Set(dataAssets.map((asset) => asset.ticker))];



  //* data to be passed to profile card = username = useSelector(state.username.username), joinDate = date, assetsOwned = unique tickers, assetsTotal = balance;
  const user = {
    username: username,
    profilePic: '/profile-pic.png',
    joinDate: date,
    assetsOwned:  uniqueTickers,
    assetsTotal: balance,
  };

  // * data to be passed to asset card = name = asset.company_name, price = asset.price, icon = '/stock-icon.png';
  
  const assets = Array.isArray(dataAssets)
  ? dataAssets.flatMap((assetGroup) =>
      assetGroup.assets.map((individualAsset) => ({
        name: assetGroup.ticker, // Use the ticker as the name
        price: individualAsset.price || 0, // Extract price
        quantity: individualAsset.quantity || 0, // Extract quantity
        stock_id: individualAsset.stock_id, // Extract stock_id

      }))
    )
  : [];


  
  // * data to be passed to activity table = activities = activities;
  const activities = userActivities.map(activity => {
    // Find the corresponding asset from dataAssets using stock_id
    const matchingAsset = assets.find(asset => asset.stock_id === activity.stock_id)
      // Getting the first element from the array, since flatMap returns an array.

    return {
      date: activity.transaction_date,
      description: activity.transaction_type,
      quantity: activity.quantity,
      amount: Number(activity.price) * Number(activity.quantity),
      ticker: matchingAsset ? matchingAsset.name : 'Unknown', // Use the matched ticker or 'Unknown' if not found
    };
  });
  
  
  return (
    <div className="dashboard-container bg-purple-50 h-screen flex p-8">
      <div className="flex gap-8 w-full">
        {/* Sidebar */}
        <Sidebar className="h-full" />
  
        {/* Main Content */}
        <main className="flex-1">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          </header>
  
          {/* Assets Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Assets</h2>
            <div className="grid grid-cols-3 gap-6">
              {assets.map((asset) => {
                return <AssetCard key={asset.id} asset={asset} />;
              })}
            </div>
          </section>
          {/* Activity Section */}
          <ActivityTable activities={activities} />
        </main>
  
        {/* Profile Section */}
        <ProfileCard user={user} />
      </div>
    </div>
  );
  
}

export default Home;
