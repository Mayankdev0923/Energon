import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleSuccess } from "../components/utils";
import axios from "axios";
import { Battery, User, BarChart3, Trophy, Zap } from "lucide-react";

function UserDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [energyStats, setEnergyStats] = useState({
    totalDonations: 0,
    energyUnits: 0,
    globalRank: 45, // Placeholder, update if API provides rank
    efficiency: 92, // Placeholder, update if API provides efficiency
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getTransactions"
        );
        setTransactions(response.data);

        // Calculate Total Energy Units and Donations from transactions
        const totalDonations = response.data.length;
        const energyUnits = response.data.reduce(
          (sum, tx) => sum + tx.amount,
          0
        );

        setEnergyStats((prevStats) => ({
          ...prevStats,
          totalDonations,
          energyUnits,
        }));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/auth");
    }, 1000);
  };

  const navigatetofind = () => {
    navigate("/findenergy");
  };

  return (
    <div
      className={`flex items-center min-h-screen ${
        darkMode
          ? 'bg-[url("/Chats.png")] bg-center bg-cover text-gray-100'
          : "bg-gray-100 text-gray-900"
      } p-4 sm:p-8`}
    >
      <div className="max-w-7xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Profile Section */}
          <div className="md:col-span-3 bg-gray-950/50 rounded-3xl p-8 shadow-lg backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-3xl bg-gray-700 flex items-center justify-center shadow-inner">
                <User className="w-14 h-14 text-blue-500" />
              </div>
              <h2 className="mt-6 text-2xl font-bold">
                {localStorage.getItem("loggedInUser") || "User"}
              </h2>
              <p className="text-sm text-gray-400">Energy Contributor</p>
              <div className="mt-6 w-full space-y-4">
                <button
                  className="text-sm font-medium text-center uppercase bg-gray-900 bg-opacity-50 p-4 rounded-xl"
                  onClick={navigatetofind}
                >
                  Get Energy
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="md:col-span-9 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: <Battery className="w-8 h-8 text-green-500" />,
                  label: "Energy Units",
                  value: loading ? "Loading..." : energyStats.energyUnits,
                },
                {
                  icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
                  label: "Total Donations",
                  value: loading ? "Loading..." : energyStats.totalDonations,
                },
                {
                  icon: <Trophy className="w-8 h-8 text-yellow-500" />,
                  label: "Global Rank",
                  value: `#${energyStats.globalRank}`,
                },
                {
                  icon: <Zap className="w-8 h-8 text-purple-500" />,
                  label: "Efficiency",
                  value: `${energyStats.efficiency}%`,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-950/50 rounded-3xl p-6 shadow-lg"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-2xl bg-gray-700 bg-opacity-50 mb-3">
                      {stat.icon}
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Transactions Section */}
            <div className="bg-gray-950/50 rounded-3xl shadow-lg backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  Latest Transactions :
                </h3>
                {loading ? (
                  <p className="text-gray-400">Loading transactions...</p>
                ) : transactions.length === 0 ? (
                  <p className="text-gray-400">No transactions found.</p>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((tx) => (
                      <div
                        key={tx._id}
                        className="p-4 flex items-center justify-between rounded-2xl bg-gray-700 bg-opacity-50"
                      >
                        <div>
                          <p className="font-medium">Token ID: {tx.token_id}</p>
                          <p className="text-sm text-gray-400">
                            Grid ID: {tx.grid_id}
                          </p>
                          <p className="text-sm text-gray-400">
                            Buyer: {tx.buyer_email}
                          </p>
                        </div>
                        <p className="font-bold text-blue-500">
                          {tx.amount} Tokens
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default UserDashboard;
