import React from 'react';
import profilePic from '../assets/profile.jpg';
import { useNavigate } from 'react-router';

const ProfileCard = ({ user }) => {
  const { username, joinDate, assetsOwned, assetsTotal } = user;
const navigate = useNavigate();
  return (
    <div className="w-1/6 bg-gradient-to-b from-purple-50 to-white shadow-md rounded-lg p-6 flex flex-col justify-between">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Trader Profile
        </p>
        <img
          src={profilePic}
          alt={username}
          className="w-24 h-24 rounded-full shadow-md mb-4 mt-2"
        />
        <h2 className="text-lg font-bold text-gray-800">{username}</h2>
      </div>

      {/* Account Section */}
      <div className="mt-6">
        <p className="text-sm font-bold text-gray-500 mb-4">Account</p>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-semibold text-sm">Joined</span>
          </div>
          <span className="font-semibold text-gray-700 text-sm bg-purple-100 px-2 py-1 rounded-lg">
            {new Date(joinDate).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-semibold text-sm">Assets Total</span>
          <span className="font-semibold text-gray-700 text-sm bg-green-100 px-3 py-1 rounded-lg">
            ${assetsTotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Assets Owned */}
      <div className="mt-6">
        <h3 className="text-md font-semibold text-gray-700 mb-4">Assets Owned:</h3>
        <div className="grid grid-cols-2 gap-3">
          {assetsOwned.map((asset, index) => (
            <div
              key={index}
              className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-2 rounded-lg shadow-sm flex items-center justify-center"
            >
              {asset}
            </div>
          ))}
        </div>
      </div>

      {/* Trade Now Button */}
      <button className="mt-6 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition" onClick={()=>navigate('/trading')}>
        Trade Now
      </button>
    </div>
  );
};

export default ProfileCard;
