import React from 'react';

const ActivityTable = ({ activities }) => {
  const sortedActivities = [...activities].sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-y-auto max-h-52">
          <table className="w-full table-auto text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-gray-600 font-medium">Stock</th>
                <th className="px-4 py-2 text-gray-600 font-medium">Description</th>
                <th className="px-4 py-2 text-gray-600 font-medium">Quantity</th>
                <th className="px-4 py-2 text-gray-600 font-medium">Amount</th>
                <th className="px-4 py-2 text-gray-600 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedActivities.map((activity, index) => {
                const date = new Date(activity.date);
                const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
                return (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="px-4 py-2 text-gray-700">{activity.ticker}</td>
                    <td className={`px-4 py-2 font-semibold ${typeof activity.description === 'string' && activity.description.trim().toLowerCase() === 'buy' ? 'text-green-500' : activity.description.trim().toLowerCase() === 'sell' ? 'text-red-500' : 'text-gray-700'}`}>
                      {activity.description.trim()}
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-gray-700">{activity.quantity}</span>
                    </td>
                    <td className="px-4 py-2 text-gray-700">${activity.amount.toFixed(2)}</td>
                    <td className="px-4 py-2 text-gray-700">{formattedDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ActivityTable;
