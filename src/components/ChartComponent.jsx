import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartComponent({ data, fiveDaysTrendData }) {
  const [currentChart, setCurrentChart] = useState('closingPrices'); // State to toggle between datasets

  // Validate timestamps and format dates
  const labels = data.map((entry) => {
    const timestamp = Date.parse(entry.timestamp); // Parse ISO string to a valid timestamp
    return !isNaN(timestamp)
      ? new Date(timestamp).toLocaleString('en-US', { day: 'numeric', month: 'short' }) // Format to 'day month' (e.g., 5 Dec)
      : 'Invalid Timestamp';
  });

  // Five days trend labels
  const fiveDaysLabels = fiveDaysTrendData.map((entry) => {
    const timestamp = Date.parse(entry.timestamp);
    return !isNaN(timestamp)
      ? new Date(timestamp).toLocaleString('en-US', { day: 'numeric', month: 'short' })
      : 'Invalid Timestamp';
  });

  // Prepare datasets for Closing Prices, Volume, and Five Days Trend
  const closingPrices = data.map((entry) => entry.close || null);
  const volumes = data.map((entry) => entry.volume || null);
  const fiveDaysTrend = fiveDaysTrendData.map((entry) => entry.close || null);

  const datasets = {
    closingPrices: {
      label: 'Closing Prices',
      data: closingPrices,
      borderColor: 'rgba(128, 90, 213, 1)',
      backgroundColor: 'rgba(128, 90, 213, 0.2)',
    },
    volumes: {
      label: 'Volume',
      data: volumes,
      borderColor: 'rgba(94, 53, 177, 1)',
      backgroundColor: 'rgba(94, 53, 177, 0.2)',
    },
    fiveDaysTrend: {
      label: '5 Days Trend',
      data: fiveDaysTrend,
      borderColor: 'rgba(94, 53, 177, 1)',
      backgroundColor: 'rgba(94, 53, 177, 0.2)',
    },
  };

  const chartData = {
    labels: currentChart === 'fiveDaysTrend' ? fiveDaysLabels : labels,
    datasets: [datasets[currentChart]],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Stock Data Chart',
        color: 'gray',
        font: {
          size: 16,
        },
      },
      legend: {
        labels: {
          color: '#000',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#000',
        },
      },
      y: {
        ticks: {
          color: '#000',
        },
      },
    },
  };

  const chartOptions = [
    { value: 'closingPrices', label: 'Closing Prices' },
    { value: 'volumes', label: 'Volume' },
    { value: 'fiveDaysTrend', label: '5 Days Trend' },
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-md">
      <div className="h-64 mb-6">
        <Line data={chartData} options={options} />
      </div>

      <div className="flex justify-center flex-wrap gap-4">
        {chartOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setCurrentChart(option.value)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
              currentChart === option.value
                ? 'bg-purple-600 text-white'
                : 'bg-purple-200 text-purple-800 hover:bg-purple-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ChartComponent;
