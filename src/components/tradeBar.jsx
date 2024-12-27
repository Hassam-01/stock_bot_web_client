import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setTradeDetail } from '../features/tradeDetail/tradeDetailSlice';
import { toast } from 'react-toastify';

function TradeBar({ tradeBarData, assets }) {
  const { ticker, price, date, signal } = tradeBarData;
  const [quantities, setQuantities] = useState({});
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [recommendation, setRecommendation] = useState(null); // Store recommendation response
  const [showConfirm, setShowConfirm] = useState(false); // Toggle confirm button visibility
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.dashboard.balance);
  const addedTrade = useSelector((state) => state.setTrade.items);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const signal_value = useSelector((state) => state.pythonData.pythonData.signal_value);
  const volatility = useSelector((state) => state.pythonData.pythonData.volatility);
  // const userId = 1;
  const userId = useSelector((state) => state.userId.userId);
  const handleQuantityChange = (item, value) => {
    setQuantities((prev) => ({
      ...prev,
      [item.price]: Math.min(Math.max(1, parseInt(value) || 1), item.quantity),
    }));
  };

  const handleBuyQuantityChange = (value) => {
    setBuyQuantity(Math.max(1, parseInt(value) || 1));
  };

  const totalSellCost = addedTrade
    .reduce((total, item) => {
      const quantity = quantities[item.price] || 1;
      return total + price * quantity;
    }, 0)
    .toFixed(2);

  const totalBuyCost = (price * buyQuantity).toFixed(2);

  useEffect(() => {
    const total = assets.reduce((sum, asset) => sum + asset.quantity, 0);
    setTotalQuantity(total);
  }, [assets]);

  const handleExecute = async () => {
    const excuteRecommendationData =
      signal === "BUY"
        ? {
            stock_price: Number(price),
            net_worth: Number(balance),
            signal_value: Number(signal_value),
            ticker: String(ticker).toUpperCase(),
            volatility: Number(volatility),
          }
        : {
            ticker: String(ticker).toUpperCase(),
            net_worth: Number(balance),
            stocks_owned: Number(totalQuantity),
            purchase_price: Number(addedTrade[0]?.price || 0),
            signal_value: Number(signal_value),
            stock_price: Number(price),
            volatility: Number(volatility),
          };

    try {
      const tradeResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/trade/${signal.toLowerCase()}/recommendation`,
        excuteRecommendationData
      );
      setRecommendation(tradeResponse.data.message); // Store the response
      setShowConfirm(true); // Show confirm button
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    }
  };

  const handleConfirm = async () => {
    const dataSend =
      signal === "SELL"
        ? addedTrade.map((item) => ({
            sellPrice: price,
            sellQuantity: buyQuantity || 1,
            sellDate: date,
            sellTicker: item.name,
            sellSignal: signal,
            sellStockId: item.stock_id,
            sellPriceId: item.price_id,
          }))
        : { price, quantity: buyQuantity, date, signal, ticker };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/trade/${userId}/${signal.toLowerCase()}`,
        { dataSend }
      );
      setRecommendation(null); // Clear recommendation after confirming
      setShowConfirm(false); // Hide confirm button
      toast.success("Trade confirmed successfully!");
    } catch (error) {
      console.error("Error confirming trade:", error);
    }
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg w-1/3 mx-auto">
      <div className="mb-4">
        <label htmlFor="quantity" className="block mb-2 text-sm font-semibold text-gray-600">
          Trade Bar: {signal}
        </label>

        {signal === "SELL" && (
          <div className="flex flex-col gap-2">
            {addedTrade.map((item, index) => (
              <div key={index} className="flex items-center justify-between space-x-4">
                <p className="text-sm text-gray-600 font-medium">
                  Price: <span className="font-semibold">${price}</span>
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  Available: <span className="font-semibold">{item.quantity}</span>
                </p>
                <input
                  type="number"
                  min="1"
                  max={item.quantity}
                  value={quantities[item.price] || 1}
                  onChange={(e) => handleQuantityChange(item, e.target.value)}
                  className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ))}
          </div>
        )}

        {signal === "BUY" && (
          <div className="flex items-center justify-between space-x-4">
            <p className="text-sm text-gray-600 font-medium">
              Ticker: <span className="font-semibold">{ticker}</span>
            </p>
            <p className="text-sm text-gray-600 font-medium">
              Price: <span className="font-semibold">${price}</span>
            </p>
            <input
              type="number"
              min="1"
              value={buyQuantity}
              onChange={(e) => handleBuyQuantityChange(e.target.value)}
              className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        )}
      </div>

      <div className="mb-4 text-center">
        <span className="block text-sm font-semibold text-gray-600 mb-1">Total Cost:</span>
        <span className="text-xl font-bold text-purple-600">
          ${signal === "SELL" ? totalSellCost : totalBuyCost}
        </span>
      </div>

      <button
        onClick={handleExecute}
        className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 text-center"
      >
        Execute
      </button>

      {recommendation && (
        <div className="mt-4 p-4 bg-blue-100 rounded-lg">
          <p className="text-sm text-blue-700 font-medium">Recommendation: {recommendation}</p>
        </div>
      )}

      {showConfirm && (
        <button
          onClick={handleConfirm}
          className="mt-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 text-center"
        >
          Confirm
        </button>
      )}
    </div>
  );
}

export default TradeBar;
