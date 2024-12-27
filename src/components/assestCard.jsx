import React from 'react';
import icon from '../assets/icon.jpg';
const AssetCard = ({ asset }) => {
  // for now change is ignored
  const { name, price, quantity } = asset;

  return (
    <div className="p-4 bg-gradient-to-b from-blue-50 to-white shadow-md rounded-lg flex items-center gap-4">
      {/* Icon Section */}
      <div className="flex-shrink-0">
        <img
          src={icon}
          alt= ":("
          className="w-14 h-14 rounded-full border-2 border-blue-100 shadow-sm"
        />
      </div>

      {/* Details Section */}
      <div className="flex-1">
        {/* Asset Name */}
        <h3
          className="text-lg font-semibold text-gray-800 truncate"
          title={name} // Tooltip for long names
        >
          {name}
        </h3>

        {/* Price */}
        <div className="text-sm font-medium text-gray-600 mt-1 flex flex-col">
          <div>
          Price: <span className="text-blue-600 font-semibold">${Number(price).toFixed(2)}</span>
          </div>
          <div>
          Quantity: <span className="text-purple-600 font-semibold">{quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
