import React from 'react';
import { FuelLocation } from '../types';
import { Star, Clock, Battery, Droplet, Fuel } from 'lucide-react';

interface LocationDetailsProps {
  location: FuelLocation;
  onClose: () => void;
}

const getIcon = (type: FuelLocation['type']) => {
  switch (type) {
    case 'Electric':
      return <Battery className="w-6 h-6 text-green-400" />;
    case 'Hydrogen':
      return <Droplet className="w-6 h-6 text-blue-400" />;
    case 'Gas':
      return <Fuel className="w-6 h-6 text-orange-400" />;
  }
};

export const LocationDetails: React.FC<LocationDetailsProps> = ({
  location,
  onClose,
}) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 bg-gray-900/95 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-800">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        ×
      </button>
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gray-800 rounded-lg">
          {getIcon(location.type)}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white">{location.name}</h2>
          <p className="text-gray-400">{location.address}</p>
          
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <h3 className="text-sm font-medium text-gray-400">Price</h3>
              <p className="text-lg font-semibold text-green-400">
                ${location.price.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <h3 className="text-sm font-medium text-gray-400">Availability</h3>
              <p className={`text-lg font-semibold
                ${location.availability === 'High' ? 'text-green-400' : ''}
                ${location.availability === 'Medium' ? 'text-yellow-400' : ''}
                ${location.availability === 'Low' ? 'text-red-400' : ''}
              `}>
                {location.availability}
              </p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <h3 className="text-sm font-medium text-gray-400">Rating</h3>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold text-white">
                  {location.rating}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Start Trading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};