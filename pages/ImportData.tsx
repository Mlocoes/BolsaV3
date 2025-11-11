
import React, { useState, useRef } from 'react';

const ImportData: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const handleImportClick = () => {
    // Trigger file input click
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Import Data</h1>

      {/* Import from Finnhub */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Import from Finnhub</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="tickers" className="block text-sm font-medium text-gray-300 mb-1">
              Asset Tickers (comma-separated)
            </label>
            <input
              type="text"
              id="tickers"
              placeholder="e.g., AAPL,MSFT,GOOG"
              className="w-full max-w-lg px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
              Import Latest Quotes
            </button>
            <button className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors">
              Import Historical Data
            </button>
          </div>
        </div>
      </div>

      {/* Import from Excel */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Import Operations from Excel</h2>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".xlsx, .xls, .csv"
          />
          <button
            onClick={handleImportClick}
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white transition-colors"
          >
            Choose File
          </button>
          {fileName && <span className="text-gray-300">{fileName}</span>}
          <button
            disabled={!fileName}
            className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors disabled:bg-green-800 disabled:cursor-not-allowed"
          >
            Upload & Process
          </button>
        </div>
      </div>
      
      {/* Job Status */}
       <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Import Job Status</h2>
        <div className="text-gray-400">
            <p>No active import jobs.</p>
            {/* Example of a job in progress */}
            {/* 
            <div className="mt-2 p-3 bg-gray-700 rounded-md">
                <p><strong>Job #12345:</strong> Importing historical data for AAPL...</p>
                <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '45%'}}></div>
                </div>
            </div>
            */}
        </div>
      </div>

    </div>
  );
};

export default ImportData;
