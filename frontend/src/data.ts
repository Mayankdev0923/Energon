import { FuelLocation } from './types';  // adjust the path to your types file

export let fuelLocations: FuelLocation[] = [
  {
    id: '1',
    name: 'Sec 14c Powerstation',
    address: '123 Green Street, Sector 14, Gurugram',
    coordinates: [77.0266, 28.4595],  // Coordinates for Gurugram
    price: 0.45,
    availability: 50,
    rating: 4.5,
    email: 'a@a.com',
  },
  {
    id: '2',
    name: 'Colony 2 Power Hub',
    address: '456 Innovation Ave, Cyber Hub, Gurugram',
    coordinates: [77.035, 28.463],  // New coordinates in Gurugram
    price: 5.99,
    availability: 100,
    rating: 4.2,  
    email: 'b@b.com',

  },
  {
    id: '3',
    name: 'Smart Grid 3',
    address: '789 Energy Road, Sohna Road, Gurugram',
    coordinates: [77.0805, 28.4602],  // New coordinates in Gurugram
    price: 3.45,
    availability: 20,
    rating: 4.8,
    email: 'c@c.com',

  },
  // Add more fuel stations or locations as needed for Gurugram
];
