import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignal, FaChartLine, FaMoneyCheckAlt, FaLightbulb } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import sirJunaid from '../assets/sirJunaid.png';
import attendance from '../assets/attendance.png';
import student from '../assets/students.png';

const CoverPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-purple-900 text-white font-sans relative">
      {/* Left side: Student */}
      <img
        src={student}
        alt="Student"
        className="absolute opacity-0 animate-fade-in-up left-40 top-[20%] transform -translate-y-1/2 h-48 sm:h-64"
        style={{ animationDelay: '2.2s' }}

      />

      {/* Text Section */}
      <div className="text-center space-y-4">
        <h3
          className="opacity-0 animate-fade-in-up text-2xl font-semibold tracking-widest uppercase"
          style={{ animationDelay: '0.5s' }}
        >
          Presented By
        </h3>

        <h1
          className="opacity-0 animate-fade-in-up text-6xl font-extrabold mt-2 tracking-tight"
          style={{ animationDelay: '1s' }}
        >
          Team SastaAI
        </h1>

        <h3
          className="opacity-0 animate-fade-in-up text-xl font-light mt-2 italic"
          style={{ animationDelay: '1.5s' }}
        >
          AI Trading Bot
        </h3>
      </div>

      {/* Right side: Sir Junaid and Message */}
      <div className="absolute right-8 top-[20%] opacity-0 animate-fade-in-up transform -translate-y-1/2 flex items-start -space-x-12"
        style={{ animationDelay: '2.0s' }}
>

        {/* <div className="bg-purple-200 p-4 rounded-lg shadow-lg text-purple-900"> */}
          <img
            src={attendance}
            alt="Attendance Message"
            className="w-40 mt-2"
            />
        <img
          src={sirJunaid}
          alt="Sir Junaid"
          className="h-32 sm:h-64 rounded-lg "
        />
      </div>

      {/* Navigate Button */}
      <button
        onClick={() => navigate('/login')}
        className="opacity-0 animate-fade-in-up mt-8 flex items-center justify-center text-white font-bold rounded-full hover:shadow-xl hover:from-purple-400 hover:to-purple-600 transition-transform transform hover:scale-110"
        style={{ animationDelay: '3.6s', width: '5rem', height: '5rem' }}
      >
        <FiArrowRight className="text-4xl animate-pulse" />
      </button>

      {/* Features Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        <div
          className="opacity-0 animate-fade-in-up bg-gradient-to-br from-purple-700 via-purple-500 to-purple-300 text-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform transform"
          style={{ animationDelay: '2.5s' }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <FaSignal className="text-3xl text-purple-200" />
            <h4 className="text-lg font-semibold">Signal Recommendations</h4>
          </div>
          <p className="text-sm">Gives signal recommendations for a given company.</p>
        </div>

        <div
          className="opacity-0 animate-fade-in-up bg-gradient-to-br from-blue-700 via-blue-500 to-blue-300 text-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform transform"
          style={{ animationDelay: '2.8s' }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <FaChartLine className="text-3xl text-blue-200" />
            <h4 className="text-lg font-semibold">Track Investments</h4>
          </div>
          <p className="text-sm">Keeps track of all your investments and stocks.</p>
        </div>

        <div
          className="opacity-0 animate-fade-in-up bg-gradient-to-br from-green-700 via-green-500 to-green-300 text-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform transform"
          style={{ animationDelay: '3.1s' }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <FaMoneyCheckAlt className="text-3xl text-green-200" />
            <h4 className="text-lg font-semibold">Manage Transactions</h4>
          </div>
          <p className="text-sm">Maintains transactions and records seamlessly.</p>
        </div>

        <div
          className="opacity-0 animate-fade-in-up bg-gradient-to-br from-yellow-700 via-yellow-500 to-yellow-300 text-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform transform"
          style={{ animationDelay: '3.4s' }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <FaLightbulb className="text-3xl text-yellow-200" />
            <h4 className="text-lg font-semibold">Investment Guidance</h4>
          </div>
          <p className="text-sm">Gives recommendations on how much to invest or sell.</p>
        </div>
      </div>
    </div>
  );
};

export default CoverPage;
