import { useState } from 'react';
import { MapPin, Mail, User, Phone, Building } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function App() {
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [address, setAddress] = useState('');

  const handleMapSelect = async () => {
    // Check if the Geolocation API is available
    if ("geolocation" in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude.toString(), lng: longitude.toString() });
        
        // Reverse geocoding using Google Maps Geocoding API
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.results[0]) {
          setAddress(data.results[0].formatted_address);
        }
      } catch (error) {
        console.error("Error getting location:", error);
      }
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-20" />
      <Card className="w-full max-w-2xl backdrop-blur-xl bg-gray-950/70 border-gray-800 rounded-xl p-8 relative z-10 shadow-2xl">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Contact Information</h1>
            <p className="text-gray-400">Please fill in your details below</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl" >
            <div className="space-y-2">
              <Label className="text-gray-300" htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  id="name"
                  className="pl-10 bg-gray-900/50 border-gray-800 text-white rounded-xl" 
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300" htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  id="email"
                  type="email"
                  className="pl-10 bg-gray-900/50 border-gray-800 text-white rounded-xl" 
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300" htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  id="phone"
                  type="tel"
                  className="pl-10 bg-gray-900/50 border-gray-800 text-white rounded-xl" 
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300" htmlFor="company">Company</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  id="company"
                  className="pl-10 bg-gray-900/50 border-gray-800 text-white rounded-xl" 
                  placeholder="Company Name"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Location</Label>
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-800 text-white rounded-xl"
                  placeholder="Enter your address"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  value={coordinates.lat}
                  onChange={(e) => setCoordinates(prev => ({ ...prev, lat: e.target.value }))}
                  className="bg-gray-900/50 border-gray-800 text-white rounded-xl"
                  placeholder="Latitude"
                />
                <Input 
                  value={coordinates.lng}
                  onChange={(e) => setCoordinates(prev => ({ ...prev, lng: e.target.value }))}
                  className="bg-gray-900/50 border-gray-800 text-white rounded-xl"
                  placeholder="Longitude"
                />
              </div>

              <Button 
                onClick={handleMapSelect}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex flex-row justify-center items-center"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Get Current Location
              </Button>
            </div>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
          >
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default App;