import React from "react";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatContainer from "./pages/ChatContainer";
// import Rankings from "./pages/Rankings";
import TradeEnergy from "./pages/TradeEnergy";
import MarketPlace from "./pages/EnergyMarketPlace";
// import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./pages/Auth2";
import ResourceForm from "./pages/ResourceForm";
import UserDashboard from "./pages/UserDashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./AuthContext"; // Import AuthProvider and AuthContext

function Home() {
  return <HomePage />;
}

function DashBoard() {
  return <UserDashboard />;
}

// function Admin() {
//   return <AdminDashboard />;
// }

function FindFuel() {
  return <TradeEnergy />;
}
function marketPlace() {
  return <MarketPlace />;
}

function Form() {
  return <ResourceForm />;
}

function Chats2() {
  return <ChatContainer />;
}

function AuthPage() {
  return <Auth />;
}

// function RankingsPage() {
//   return <Rankings />;
// }

function ProtectedRoute({ element }) {
  const { isAuthenticated } = React.useContext(AuthContext); // Get authentication state
  return isAuthenticated ? element : <Navigate to="/auth" />;
}

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the app with AuthProvider */}
      <Router>
        {" "}
        {/* Router should wrap everything */}
        <Navbar /> {/* Navbar inside Router */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<DashBoard />} />}
            />
            <Route path="/form" element={<Form />} />
            {/* <Route path="/rankings" element={<RankingsPage />} /> */}
            <Route path="/chats" element={<ProtectedRoute element={<Chats2 />} />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/market" element={<MarketPlace />} />
            <Route path="/findenergy" element={<FindFuel />} />
            {/* <Route path="/admin" element={<Admin />} /> */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
