import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/sideBar";
import AssetOverview from "../components/assetOverview";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PythonDataViewer from "../components/pythonDataView";
import ChartComponent from "../components/ChartComponent";
import TradeBar from "../components/tradeBar";
import { setPythonData } from "../features/pyhtonData/pythonDataSlice";
import { FaBars } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Trading() {
  const [ticker, setTicker] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [predictionData, setPredictionData] = useState([]);
  const [fivedaystrend, setFiveDaysTrend] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tradeDetails, setTradeDetails] = useState({ date: "", price: "" });
  const dispatch = useDispatch();
  const dataAssets = useSelector((state) => state.dashboard.assets);
  const pythonData = useSelector((state) => state.pythonData.pythonData);

  const isValidTicker = (ticker) => {
    const regex = /^[A-Z]{1,5}$/;
    return regex.test(ticker);
  };

  const handleGetRecommendation = async () => {
    // setPredictionData("predictionData");
    const upperTicker = ticker.toUpperCase();
    if (!isValidTicker(upperTicker)) {
      toast.error("Invalid ticker symbol! Please enter a valid stock ticker.");
      return;
    }
    toast.info("Fetching recommendation...");

    try {
      const response = await axios.post(
        "https://stock-bot-9kw6.onrender.com/api/signal/recommendation",
        {
          ticker: upperTicker,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const {
        signal,
        trade_date,
        trade_price,
        predictionData,
        pythonData,
        five_days_trend_data,
      } = response.data;

      setRecommendation(signal);
      setPredictionData(predictionData);
      dispatch(setPythonData(pythonData));
      setTradeDetails({ date: trade_date, price: trade_price });
      setFiveDaysTrend(five_days_trend_data);
      toast.success("Recommendation fetched successfully!");
    } catch (err) {
      console.error("Error fetching recommendation:", err);
      toast.error("Failed to fetch recommendation. Please try again later.");
    }
  };

  const filteredAssets = Array.isArray(dataAssets)
    ? dataAssets
        .filter((assetGroup) => assetGroup.ticker === ticker)
        .flatMap((assetGroup) =>
          assetGroup.assets.map((individualAsset) => ({
            name: assetGroup.ticker,
            price: individualAsset.price || "N/A",
            quantity: individualAsset.quantity || "N/A",
            stock_id: individualAsset.stock_id,
            price_id: individualAsset.price_id,
          }))
        )
    : [];

  const tradeBarData = {
    ticker: ticker.toUpperCase(),
    price: tradeDetails.price,
    date: tradeDetails.date,
    signal: recommendation,
  };

  return (
    <div className="trading-container bg-purple-50 md:h-screen flex flex-col md:flex-row ">
      <ToastContainer />
      <div className="md:hidden w-full fixed z-20 text-purple-600 h-fit bg-white shadow-lg flex justify-between items-center p-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg"
        >
          <FaBars size={24} />
        </button>
        <h1 className="text-2xl font-bold">Trading</h1>
        <div className="w-8"></div>{" "}
      </div>

      <div className="p-4 flex flex-1 mt-16 md:mt-0 flex-col md:flex-row gap-8 w-full">
        <div
          className={`sidebar-container fixed inset-y-0 left-0 z-30 bg-white w-64 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64`}
        >
          <Sidebar className="h-full" />
        </div>
        <main className="flex-1 flex flex-col">
          <header className="hidden md:flex md:justify-between justify-center items-center mb-4 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Trading
            </h1>
          </header>
          <div className="flex flex-col md:flex-row gap-4">
            <section className="flex-1 mb-10">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Enter Stock Ticker"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  className="border rounded px-4 py-2 w-full md:max-w-sm"
                />
                <button
                  onClick={handleGetRecommendation}
                  className="bg-purple-600 text-white px-4 py-2 rounded w-full md:w-fit"
                >
                  Get Recommendation
                </button>
              </div>
              {recommendation && (
                <div className="mt-4 text-lg font-semibold text-gray-800">
                  <span className="text-black">Recommendation: </span>
                  <span
                    className={
                      recommendation.toLowerCase() === "buy"
                        ? "text-green-600"
                        : recommendation.toLowerCase() === "sell"
                        ? "text-red-600"
                        : "text-purple-600"
                    }
                  >
                    {recommendation.toUpperCase()}
                  </span>
                </div>
              )}
              {tradeDetails.date && tradeDetails.price && (
                <div className="mt-4 text-lg font-medium text-gray-700">
                  <span>
                    Trade Date:{" "}
                    <span className="text-purple-500">{tradeDetails.date}</span>
                  </span>
                  <span className="ml-4">
                    Trade Price:{" "}
                    <span className="text-purple-500">
                      ${tradeDetails.price}
                    </span>
                  </span>
                </div>
              )}
            </section>
            <AssetOverview className="fixed" assets={filteredAssets} />
          </div>
          <div className=" md:flex-row flex flex-col gap-4 mt-4 md:items-end items-center">
            {predictionData && (
              <section className="mt-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Prediction Data
                </h2>
                <ChartComponent
                  data={predictionData}
                  tradeDetails={tradeDetails}
                  fiveDaysTrendData={fivedaystrend}
                />
              </section>
            )}
            <PythonDataViewer data={pythonData} />
            <TradeBar tradeBarData={tradeBarData} assets={filteredAssets} />
          </div>
        </main>
      </div>
      {(sidebarOpen ) && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20"
          onClick={() => {
            setSidebarOpen(false);
          }}
        ></div>
      )}
    </div>
  );
}

export default Trading;
