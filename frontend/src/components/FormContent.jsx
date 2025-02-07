import { useState } from "react";
import { MapPin, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fuelLocations } from '../data';  // Importing the fuelLocations array

function App() {
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [rating, setRating] = useState("");

  const handleMapSelect = async () => {
    if ("geolocation" in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude.toString(), lng: longitude.toString() });

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY
          }`
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      address,
      coordinates: [coordinates.lng, coordinates.lat], // [longitude, latitude]
      price: parseFloat(price),
      availability: parseInt(availability, 10),
      rating: parseFloat(rating),
      email,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/pushFuelLocation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Fuel location added successfully!");

        // Update the fuelLocations array with new entry
        const newId = (fuelLocations.length + 1).toString();  // Generate new ID (you can adjust the logic)
        const newLocation = { id: newId, ...formData };
        fuelLocations.push(newLocation);  // Push the new location to fuelLocations

        // Reset form
        setName("");
        setEmail("");
        setAddress("");
        setCoordinates({ lat: "", lng: "" });
        setPrice("");
        setAvailability("");
        setRating("");
      } else {
        alert("Error adding fuel location: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-20" />
      <Card className="w-full max-w-2xl backdrop-blur-xl bg-gray-950/70 border-gray-800 rounded-xl p-8 relative z-10 shadow-2xl">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">
              Fuel Location Information
            </h1>
            <p className="text-gray-400">
              Please fill in the required details below
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300" htmlFor="name">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    className="pl-10 bg-gray-900/50 border-gray-800 text-white rounded-xl"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300" htmlFor="email">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10 bg-gray-900/50 border-gray-800 text-white rounded-xl"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300" htmlFor="price">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  className="bg-gray-900/50 border-gray-800 text-white rounded-xl"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300" htmlFor="availability">
                  Availability
                </Label>
                <Input
                  id="availability"
                  type="number"
                  className="bg-gray-900/50 border-gray-800 text-white rounded-xl"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  placeholder="Enter availability"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300" htmlFor="rating">
                  Rating
                </Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  max="5"
                  className="bg-gray-900/50 border-gray-800 text-white rounded-xl"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="Enter rating (0-5)"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="pl-10 bg-gray-900/50 border-gray-800 text-white rounded-xl"
                    placeholder="Enter your address"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    value={coordinates.lat}
                    onChange={(e) =>
                      setCoordinates((prev) => ({
                        ...prev,
                        lat: e.target.value,
                      }))
                    }
                    className="bg-gray-900/50 border-gray-800 text-white rounded-xl"
                    placeholder="Latitude"
                    required
                  />
                  <Input
                    value={coordinates.lng}
                    onChange={(e) =>
                      setCoordinates((prev) => ({
                        ...prev,
                        lng: e.target.value,
                      }))
                    }
                    className="bg-gray-900/50 border-gray-800 text-white rounded-xl"
                    placeholder="Longitude"
                    required
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
            

              <Button
                type="submit"
                className="w-full bg-gradient-to-r mt-4 from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default App;
