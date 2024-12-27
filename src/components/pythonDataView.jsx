
function PythonDataViewer({ data }) {
    return (
      <div className="border rounded p-4 bg-white shadow-lg w-1/4 max-h-96">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Python Data</h3>
        {data && Object.keys(data).length > 0 ? (
          <div>
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Key</th>
                  <th className="border px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data).map(([key, value]) => (
                  <tr key={key}>
                    <td className="border px-4 py-2 font-medium">{key}</td>
                    <td className="border px-4 py-2 truncate max-w-xs overflow-hidden">
                      {typeof value === 'number' ? value.toFixed(2) : JSON.stringify(value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No data available.</p>
        )}
      </div>
    );
  }
  

export default PythonDataViewer;
  