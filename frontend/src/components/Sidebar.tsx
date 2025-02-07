import React from "react";
import { FuelLocation } from "../types";
import { Battery, Droplet, Fuel, Zap } from "lucide-react";

interface SidebarProps {
  locations: FuelLocation[];
  selectedLocation: FuelLocation | null;
  onLocationSelect: (location: FuelLocation) => void;
}


export const Sidebar: React.FC<SidebarProps> = ({
  locations,
  selectedLocation,
  onLocationSelect,
}) => {
  return (
    <div className="w-80 bg-gray-900 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-white text-center">
        Nearby Grids
      </h2>
      <div className="space-y-3">
        {locations.map((location) => (
          <div
            key={location.id}
            className={`p-4 rounded-xl cursor-pointer transition-all ${
              selectedLocation?.id === location.id
                ? "bg-gray-800 ring-2 ring-blue-500"
                : "bg-gray-800/50 hover:bg-gray-800"
            }`}
            onClick={() => onLocationSelect(location)}
          >
            <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-green-400" />
              <div>
                <h3 className="font-semibold text-white">{location.name}</h3>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-300">{location.address}</p>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-green-400">
                  {location.price.toFixed(2)} Tokens/hour
                </span>
                <span
                  className={`
                  ${location.availability >= 50 ? "text-green-400" : ""}
                  ${
                    location.availability >= 25 && location.availability < 50
                      ? "text-yellow-400"
                      : ""
                  }
                  ${location.availability < 25 ? "text-red-400" : ""}
                `}
                >
                  {location.availability} kW left
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
