import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrade, emptyTrade, removeTrade } from '../features/setTrade/setTradeSlice';

// Child Component for Asset Card
const AssetCard = ({ asset, isSelected, onClick }) => (
  <div
    onClick={() => onClick(asset)}
    className={`relative flex-shrink-0 w-40 rounded-lg shadow-md p-3 transition-shadow duration-200 cursor-pointer 
      ${isSelected ? 'bg-purple-800 text-white' : 'bg-purple-600 text-white hover:shadow-lg'}`}
  >
    <p className="text-sm font-medium">
      Bought: <span className="font-semibold">${asset.price}</span>
    </p>
    <p className="text-sm font-medium">
      Quantity: <span className="font-semibold">{asset.quantity}</span>
    </p>
  </div>
);

// Main Component
function AssetOverview({ assets }) {
  const dispatch = useDispatch();
  const addedTrade = useSelector((state) => state.setTrade.items); // Get updated state
  const isTradeEmpty = useSelector((state) => state.setTrade.items.length === 0); // Check trade state

  // Dispatch emptyTrade ONLY when assets is empty AND trade is not already empty
  useEffect(() => {
    if ((!assets || assets.length === 0) && !isTradeEmpty) {
      dispatch(emptyTrade());
    }
  }, [assets, isTradeEmpty, dispatch]); // Add isTradeEmpty to avoid redundant updates

  // Function to toggle asset selection
  const toggleAssetSelection = (asset) => {
    const isAlreadySelected = addedTrade.some((item) => item.price === asset.price);

    if (isAlreadySelected) {
      dispatch(removeTrade(asset));
    } else {
      dispatch(addTrade(asset));
    }
  };

  return (
    <div className="p-4 bg-white text-purple-600 rounded-lg shadow-md max-w-full -mt-8">
      <h2 className="text-lg font-semibold mb-3">Asset Overview</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-300 p-2">
        {assets && assets.length > 0 ? (
          assets.map((asset, index) => (
            <div className="group" key={index}>
              <AssetCard
                asset={asset}
                isSelected={addedTrade.some((item) => item.price === asset.price)}
                onClick={toggleAssetSelection}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No assets owned for this ticker.</p>
        )}
      </div>
    </div>
  );
}

export default AssetOverview;
