import React, { useState } from 'react';
import { 
  Trophy,
  MapPin,
  Zap,
  ArrowUp,
  ArrowDown,
  Sun,
  Moon,
  Repeat,
  Store
} from 'lucide-react';

// Mock data - replace with actual API data
const mockUsers = [
  { id: 1, name: "Ticket'D", location: "Singapore", trades: 1456, donations: 892, tradingRank: 1, donationRank: 2 },
  { id: 2, name: "Red Haired Pirates", location: "Dubai", trades: 1398, donations: 945, tradingRank: 2, donationRank: 1 },
  { id: 3, name: "Samsung", location: "Barcelona", trades: 1245, donations: 756, tradingRank: 3, donationRank: 4 },
  { id: 4, name: "Apple Banana Corp.", location: "London", trades: 1156, donations: 834, tradingRank: 4, donationRank: 3 },
  { id: 5, name: "Hakuna Matata", location: "Tokyo", trades: 1089, donations: 645, tradingRank: 5, donationRank: 7 },
  { id: 6, name: "Marvel Inc", location: "Sydney", trades: 987, donations: 723, tradingRank: 6, donationRank: 5 },
  { id: 7, name: "David Laid", location: "Mexico City", trades: 934, donations: 689, tradingRank: 7, donationRank: 6 },
  { id: 8, name: "Transformers", location: "Cairo", trades: 876, donations: 534, tradingRank: 8, donationRank: 9 },
  { id: 9, name: "Honda Pvt.", location: "Warsaw", trades: 845, donations: 612, tradingRank: 9, donationRank: 8 },
  { id: 10, name: "David Kim & Sons", location: "Seoul", trades: 789, donations: 478, tradingRank: 10, donationRank: 10 }
];

function Rankings() {
  const [darkMode, setDarkMode] = useState(true);
  const [showTrading, setShowTrading] = useState(true);
  
  const sortedUsers = [...mockUsers].sort((a, b) => {
    if (showTrading) {
      return a.tradingRank - b.tradingRank;
    }
    return a.donationRank - b.donationRank;
  });

  const getRankChange = (current: number, previous: number) => {
    if (current < previous) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (current > previous) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return null;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[url("/Chats.png")] bg-center bg-cover text-gray-100' : 'bg-gray-100 text-gray-900'} 
      p-4 sm:p-8 relative overflow-hidden `}>
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-2xl ${darkMode ? 'bg-gray-950 hover:bg-gray-800' : 'bg-white hover:bg-gray-100'} 
            shadow-lg transition-all duration-300 ease-in-out backdrop-blur-lg`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto relative z-10 mt-[100px]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold">Global Rankings</h1>
          </div>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Top performers in our energy trading platform
          </p>
        </div>

        {/* Toggle Switch */}
        <div className={`${darkMode ? 'bg-gray-950/50' : 'bg-white'} p-4 rounded-2xl shadow-lg 
          backdrop-blur-lg mb-6 flex items-center justify-between`}>
          <p className="font-medium">Ranking Type:</p>
          <button
            onClick={() => setShowTrading(!showTrading)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300
              ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}
          >
            {showTrading ? (
              <>
                <Store className="w-5 h-5 text-blue-500" />
                <span>Businesses</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 text-purple-500" />
                <span>Individuals</span>
              </>
            )}
            <Repeat className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Rankings List */}
        <div className={`${darkMode ? 'bg-gray-950/50' : 'bg-white'} rounded-3xl shadow-lg 
          backdrop-blur-lg overflow-hidden`}>
          {/* Headers */}
          <div className={`grid grid-cols-12 gap-4 p-4 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} 
            border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="col-span-1 font-medium">Rank</div>
            <div className="col-span-4 font-medium">Name</div>
            <div className="col-span-3 font-medium">Location</div>
            <div className="col-span-4 font-medium text-right">
              {showTrading ? 'Total Trades' : 'Total Donations'}
            </div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-gray-800">
            {sortedUsers.map((user) => (
              <div
                key={user.id}
                className={`grid grid-cols-12 gap-4 p-4 items-center transition-all duration-300
                  ${darkMode ? 'hover:bg-gray-900/30' : 'hover:bg-gray-50'}`}
              >
                <div className="col-span-1 flex items-center space-x-2">
                  <span className={`font-bold ${
                    user[showTrading ? 'tradingRank' : 'donationRank'] <= 3 
                      ? 'text-yellow-500' 
                      : darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    #{user[showTrading ? 'tradingRank' : 'donationRank']}
                  </span>
                  {getRankChange(
                    user[showTrading ? 'tradingRank' : 'donationRank'],
                    user[showTrading ? 'tradingRank' : 'donationRank'] + 1
                  )}
                </div>
                <div className="col-span-4 font-medium">{user.name}</div>
                <div className="col-span-3 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{user.location}</span>
                </div>
                <div className="col-span-4 text-right font-medium">
                  {showTrading ? (
                    <span className="text-blue-500">{user.trades.toLocaleString()}</span>
                  ) : (
                    <span className="text-purple-500">{user.donations.toLocaleString()}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rankings;