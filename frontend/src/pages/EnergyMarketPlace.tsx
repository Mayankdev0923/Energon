import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Battery, Droplet, Wallet, ArrowLeft, Check } from "lucide-react";
import axios from "axios";
import { fuelLocations } from "../data";

const EnergyMarketplace = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract station details from URL
  const stationName = searchParams.get("name") || "Sample Grid";
  const selectedStation = fuelLocations.find(
    (station) => station.name === stationName
  );
  const userEmail = searchParams.get("email");

  // State to track availability & transaction
  const [availability, setAvailability] = useState(
    selectedStation?.availability || 0
  );
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!selectedStation) {
    return <div className="text-white text-center">Station not found</div>;
  }

  // Handle amount selection
  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setSelectedAmount(Math.min(value, availability));
  };

  // Send transaction to API
  const pushTransaction = async () => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        token_id: `ENERGY-${Date.now()}`,
        amount: selectedAmount,
        grid_id: selectedStation.id,
        buyer_email: userEmail,
      };

      const response = await axios.post(
        "http://localhost:5000/api/pushTransaction",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setAvailability((prev) => prev - selectedAmount);
        const stationIndex = fuelLocations.findIndex(
          (station) => station.name === stationName
        );
        if (stationIndex !== -1) {
          fuelLocations[stationIndex].availability -= selectedAmount;
        }
        setShowConfirmation(true);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error("Transaction failed:", error.response.data);
      setError(
        error.message || "Failed to process transaction. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-950 p-8">
      <div className="max-w-4xl mt-10 mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center">
          <button
            onClick={() => window.history.back()}
            className="mr-4 p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="text-white" />
          </button>
          <h1 className="text-3xl font-bold text-white">Energy Marketplace</h1>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Station Info */}
          <div className="bg-gray-900 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">
              {selectedStation.name}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Battery className="text-green-500" />
                  <div>
                    <p className="text-gray-400 text-sm">Available</p>
                    <p className="text-white font-medium">{availability} kWh</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Droplet className="text-blue-500" />
                  <div>
                    <p className="text-gray-400 text-sm">Price per kWh</p>
                    <p className="text-white font-medium">
                      {selectedStation.price} Tokens
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amount Selection */}
            <div className="mt-6">
              <label className="block text-gray-400 mb-2">
                Select Amount (kWh)
              </label>
              <input
                type="range"
                min="0"
                max={availability}
                value={selectedAmount}
                onChange={handleAmountChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={selectedAmount}
                onChange={handleAmountChange}
                max={availability}
                className="mt-2 w-full bg-gray-800 text-white p-2 rounded-lg"
              />
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Payment Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-400">
                <span>Amount Selected:</span>
                <span className="text-white">{selectedAmount} kWh</span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Price per kWh:</span>
                <span className="text-white">{selectedStation.price} Tkns</span>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-400">Total:</span>
                  <span className="text-white">
                    {(selectedAmount * selectedStation.price).toFixed(2)} Tkns
                  </span>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-900/50 text-red-200 rounded-xl">
                  {error}
                </div>
              )}

              {!showConfirmation ? (
                <button
                  onClick={(pushTransaction)}
                  disabled={selectedAmount <= 0 || loading}
                  className="w-full mt-6 bg-green-800 hover:bg-green-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white p-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Wallet className="w-5 h-5" />
                  {loading ? "Processing..." : "Proceed to Payment"}
                </button>
              ) : (
                <div className="mt-6 bg-green-900/50 p-6 rounded-xl text-center">
                  <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Order Confirmed!
                  </h3>
                  <p className="text-gray-400">
                    Your energy purchase has been confirmed.
                  </p>
                  <button
                    onClick={() => window.history.back()}
                    className="mt-4 text-green-500 hover:text-green-400"
                  >
                    Return to Map
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyMarketplace;
