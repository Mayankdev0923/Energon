import React, { useEffect, useRef, useState } from "react";
import { Map as OLMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Icon, Stroke, Fill } from "ol/style";
import {
  Battery,
  Zap,
  Fuel,
  Home,
  Navigation,
  MessageSquare,
  Wallet,
} from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { LocationDetails } from "../components/LocationDetails";
import { fuelLocations } from "../data";
import { Geometry } from "ol/geom";
import type { FuelLocation } from "../types";
import { useNavigate } from "react-router-dom";
import "ol/ol.css";

type LocationBoxProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  onClick?: () => void; // Make onClick optional and properly typed
  className?: string;
  isTradeButton?: boolean;
  isChatButton?: boolean;
};

// Enhanced Location Details Box Component
const LocationBox = ({
  icon,
  label,
  value,
  onClick,
  className = "",
  isTradeButton = false,
  isChatButton = false,
}: LocationBoxProps) => (
  <div
    className={`flex items-center gap-2 p-3 rounded-lg ${
      onClick ? "cursor-pointer " : ""
    } ${className} ${
      isTradeButton
        ? "bg-blue-500 hover:bg-blue-700"
        : "bg-gray-800 hover:bg-gray-700"
    } ${
      isChatButton
        ? "bg-green-800 hover:bg-green-700"
        : "bg-gray-800 hover:bg-gray-700"
    }`}
    onClick={onClick}
  >
    {icon}
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  </div>
);

// Helper function to calculate distance between two coordinates (in meters)
const calculateDistance = (
  coords1: [number, number],
  coords2: [number, number]
) => {
  const rad = (x: number) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = rad(coords2[1] - coords1[1]);
  const dLon = rad(coords2[0] - coords1[0]);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(coords1[1])) *
      Math.cos(rad(coords2[1])) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Function to fetch route between two points using OSRM
const getRoute = async (start: [number, number], end: [number, number]) => {
  const response = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${start[0]},${start[1]};${end[0]},${end[1]}?overview=full&geometries=geojson`
  );
  const data = await response.json();
  return {
    coordinates: data.routes[0].geometry.coordinates,
    distance: data.routes[0].distance, // Distance in meters
  };
};

type EnhancedLocationDetailsProps = {
  location: FuelLocation;
  onClose: () => void;
  routeDistance: number | null;
  isRouteVisible: boolean;
  onToggleRoute: () => void;
};

// Enhanced LocationDetails component with distance box
const EnhancedLocationDetails = ({
  location,
  onClose,
  routeDistance,
  isRouteVisible,
  onToggleRoute,
}: EnhancedLocationDetailsProps) => {
  const navigate = useNavigate();

  const formattedDistance = routeDistance
    ? routeDistance < 1
      ? `${(routeDistance * 1000).toFixed(0)}m`
      : `${routeDistance.toFixed(1)}km`
    : "Click To Calculate";

  const handleChatClick = () => {
    navigate(`/chats?email=${encodeURIComponent(location.email)}`);
  };

  const handleTradeClick = () => {
    const params = new URLSearchParams({
      name: location.name,
      available: location.availability.toString(),
      price: location.price.toString().replace(/[^0-9.]/g, ""), 
      email: location.email.toString(),
    });
    navigate(`/market?${params.toString()}`);
  };

  return (
    <div className="absolute top-4 left-4 bg-gray-900 p-4 rounded-xl shadow-lg max-w-sm">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl text-white font-bold">{location.name}</h2>
        <button className="text-gray-400 hover:text-white" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <LocationBox
          icon={<Battery className="text-green-500" />}
          label="Price"
          value={location.price.toString()}
        />
        <LocationBox
          icon={<Zap className="text-blue-500" />}
          label="Availability"
          value={`${location.availability} kW`}
        />
        <LocationBox
          icon={<Fuel className="text-orange-500" />}
          label="Rating"
          value={`${location.rating}/5`}
        />
        <LocationBox
          icon={
            <Navigation
              className={isRouteVisible ? "text-green-500" : "text-gray-500"}
            />
          }
          label="Distance"
          value={formattedDistance}
          onClick={onToggleRoute}
          className={isRouteVisible ? "border-2 border-green-500" : ""}
        />
        <LocationBox
          icon={<MessageSquare className="text-white" />}
          label=""
          value="Chat to Contributor"
          onClick={handleChatClick}
          isChatButton={true}
          className="col-span-2"
        />
        <LocationBox
          icon={<Wallet className="text-white" />}
          label=""
          value="Buy Now"
          onClick={handleTradeClick}
          isTradeButton={true}
          className="col-span-2"
        />
      </div>
    </div>
  );
};

function App() {
  const [selectedLocation, setSelectedLocation] = useState<FuelLocation | null>(
    null
  );
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [routeDistance, setRouteDistance] = useState<number | null>(null);
  const [isRouteVisible, setIsRouteVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<OLMap | null>(null);
  const routeLayerRef = useRef<VectorLayer<
    VectorSource<Feature<Geometry>>
  > | null>(null);

  // Get user's location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setUserLocation([77.0266, 28.4576]);
        }
      );
    } else {
      console.error("Geolocation not supported");
      setUserLocation([77.0266, 28.4576]);
    }
  }, []);

  // Function to fit map view to show both points
  const fitMapToPoints = (
    map: OLMap,
    point1: [number, number],
    point2: [number, number]
  ) => {
    const padding = 100;
    const extent = [...fromLonLat(point1), ...fromLonLat(point2)];
    map.getView().fit(extent, {
      padding: [padding, padding, padding, padding],
      duration: 1000,
    });
  };

  // Function to update route
  const updateRoute = async (
    destination: [number, number],
    shouldShow: boolean
  ) => {
    if (!userLocation || !mapInstanceRef.current) return;

    try {
      // Clear existing route
      if (routeLayerRef.current) {
        mapInstanceRef.current.removeLayer(routeLayerRef.current);
        routeLayerRef.current = null;
      }

      if (shouldShow) {
        const routeData = await getRoute(userLocation, destination);

        // Create route feature
        const routeFeature = new Feature({
          geometry: new LineString(
            routeData.coordinates.map((coord) => fromLonLat(coord))
          ),
        });

        // Style for the route
        routeFeature.setStyle(
          new Style({
            stroke: new Stroke({
              color: "#4CAF50",
              width: 4,
            }),
          })
        );

        // Create new route layer
        routeLayerRef.current = new VectorLayer<
          VectorSource<Feature<Geometry>>
        >({
          source: new VectorSource<Feature<Geometry>>({
            features: [routeFeature],
          }),
        });

        mapInstanceRef.current.addLayer(routeLayerRef.current);

        // Update distance
        setRouteDistance(routeData.distance / 1000); // Convert to kilometers

        // Fit map to show both points
        fitMapToPoints(mapInstanceRef.current, userLocation, destination);
      } else {
        // Zoom to selected location
        mapInstanceRef.current.getView().animate({
          center: fromLonLat(destination),
          zoom: 15,
          duration: 1000,
        });
      }
    } catch (error) {
      console.error("Error updating route:", error);
    }
  };

  // Create map instance
  useEffect(() => {
    if (!userLocation || !mapRef.current) return;

    const sortedFuelLocations = fuelLocations
      .map((location) => ({
        ...location,
        distance: calculateDistance(
          userLocation,
          location.coordinates as [number, number]
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    const features = sortedFuelLocations.map((location) => {
      const feature = new Feature({
        geometry: new Point(
          fromLonLat(location.coordinates as [number, number])
        ),
        properties: location,
      });
      return feature;
    });

    const vectorLayer = new VectorLayer<VectorSource<Feature<Geometry>>>({
      source: new VectorSource<Feature<Geometry>>({
        features,
      }),
      style: (feature) => {
        const properties = feature.get("properties") as FuelLocation;
        const color = "#34D399";
            

        return new Style({
          image: new Icon({
            src: `data:image/svg+xml;utf8,${encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
              </svg>`
            )}`,
            scale: 1,
          }),
        });
      },
    });

    const map = new OLMap({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat(userLocation),
        zoom: 13,
      }),
    });

    const userLocationFeature = new Feature({
      geometry: new Point(fromLonLat(userLocation)),
    });

    const userLocationLayer = new VectorLayer<VectorSource<Feature<Geometry>>>({
      source: new VectorSource<Feature<Geometry>>({
        features: [userLocationFeature],
      }),
      style: new Style({
        image: new Icon({
          src: `data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red">
              <circle cx="12" cy="12" r="8" />
            </svg>`
          )}`,
          scale: 1.5,
        }),
      }),
    });

    map.addLayer(userLocationLayer);

    map.on("click", (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );
      if (feature) {
        const properties = feature.get("properties") as FuelLocation;
        setSelectedLocation(properties);
        setIsRouteVisible(false);
        updateRoute(properties.coordinates as [number, number], false);
      } else {
        setSelectedLocation(null);
        setIsRouteVisible(false);
        setRouteDistance(null);
        if (routeLayerRef.current) {
          map.removeLayer(routeLayerRef.current);
          routeLayerRef.current = null;
        }
      }
    });

    mapInstanceRef.current = map;

    return () => {
      map.setTarget(undefined);
    };
  }, [userLocation]);

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar
        locations={fuelLocations}
        selectedLocation={selectedLocation}
        onLocationSelect={(location) => {
          setSelectedLocation(location);
          setIsRouteVisible(false);
          updateRoute(location.coordinates as [number, number], false);
          if (mapInstanceRef.current) {
            mapInstanceRef.current.getView().animate({
              center: fromLonLat(location.coordinates as [number, number]),
              zoom: 15,
              duration: 500,
            });
          }
        }}
      />
      <div className="flex-1 p-4">
        <div className="h-full rounded-xl overflow-hidden relative">
          <div ref={mapRef} className="w-full h-full" />

          {/* Floating Home Button */}
          <button
            className="absolute bottom-8 right-8 p-3 backdrop-blur-sm rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            onClick={() => {
              if (mapInstanceRef.current && userLocation) {
                mapInstanceRef.current.getView().animate({
                  center: fromLonLat(userLocation),
                  zoom: 13,
                  duration: 500,
                });
              }
            }}
          >
            <Home className="w-6 h-6 text-gray-700" />
          </button>

          {selectedLocation && (
            <EnhancedLocationDetails
              location={selectedLocation}
              routeDistance={routeDistance}
              isRouteVisible={isRouteVisible}
              onClose={() => {
                setSelectedLocation(null);
                setIsRouteVisible(false);
                setRouteDistance(routeDistance);
                if (routeLayerRef.current && mapInstanceRef.current) {
                  mapInstanceRef.current.removeLayer(routeLayerRef.current);
                  routeLayerRef.current = null;
                }
              }}
              onToggleRoute={() => {
                const newRouteVisible = !isRouteVisible;
                setIsRouteVisible(newRouteVisible);
                updateRoute(
                  selectedLocation.coordinates as [number, number],
                  newRouteVisible
                );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
