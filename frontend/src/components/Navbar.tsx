import React, { useState, useContext } from "react";
import { Button } from "../components/ui/button";
import { Menu, X } from "lucide-react"; // Icons for mobile menu
import { AuthContext } from "../AuthContext"; // Import AuthContext
import { useNavigate, Link } from "react-router-dom"; // For navigation

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // Get authentication state
  const navigate = useNavigate(); // For programmatic navigation

  // Handle logout
  const handleLogout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setIsAuthenticated(false); // Update authentication state
    setTimeout(() => {
      navigate("/auth"); // Redirect to /auth
    })
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-4xl px-4">
      <div className="flex items-center justify-center bg-black/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
          {isAuthenticated ? (
            <Button
              className="bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-full px-6"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Link to="/auth">
              <Button className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-full px-6 animate-glow">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-black/50 backdrop-blur-md p-4 rounded-lg border border-white/10">
          <NavLinks mobile />
          {isAuthenticated ? (
            <Button
              className="w-full bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-full"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Link to="/auth" className="block text-center mt-3">
              <Button className="w-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-full">
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

// Component for navigation links
function NavLinks({ mobile = false }) {
  const { isAuthenticated } = useContext(AuthContext); // Get authentication state
  const classes = mobile
    ? "block text-white text-center py-2"
    : "text-gray-300 hover:text-white transition-colors";

  return (
    <>
      <Link to="/" className={classes}>
        Home
      </Link>
      <Link to="/rankings" className={classes}>
        Rankings
      </Link>
      {isAuthenticated && ( // Only show Dashboard link if authenticated
        <Link to="/dashboard" className={classes}>
          Dashboard
        </Link>
      )}
      {isAuthenticated && (
      <Link to="/chats" className={classes}>
        Chats
      </Link>
      )}
      <Link to="/findenergy" className={classes}>
        Find 
      </Link>
      {isAuthenticated && (
      <Link to="/form" className={classes}>
        List
      </Link>
      )}
      {/* {isAuthenticated && (
      <Link to="/admin" className={classes}>
        Admin
      </Link>
      )} */}
    </>
  );
}

export default Navbar;