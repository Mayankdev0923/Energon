import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext"; // Assuming this is the path to your AuthContext

const ChatApp = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuthentication = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Validate inputs
      if (!email || !password || (isSignup && !username)) {
        setError("All fields are required");
        return;
      }

      const endpoint = isSignup ? "/api/signup" : "/api/login";
      const payload = isSignup
        ? { username, email, password }
        : { email, password };

      const response = await axios.post(
        `http://localhost:5000${endpoint}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Set token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      // Update authentication state via context
      setIsAuthenticated(true);

      navigate("/dashboard");
    } catch (error) {
      // Error handling remains the same as previous version
      if (error.response) {
        setError(error.response.data.message || "Authentication failed");
        console.error("Authentication error response:",error);
      } else if (error.request) {
        setError("No response from server. Please check your connection.");
        console.error("Authentication error request:", error.request);
      } else {
        setError("Error setting up authentication request");
        console.error("Authentication error:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center text-white justify-center bg-[url('/Chats.png')] bg-cover bg-center">
      <div className="bg-black bg-opacity-50 backdrop-blur-md p-8 rounded-3xl shadow-md max-w-[450px] h-auto max-h-[500px] flex flex-col justify-center">
        <div className="my-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            {isSignup ? "Sign Up" : "Login"}
          </h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleAuthentication} className="mx-2">
            {isSignup && (
              <div>
                <label className="ml-2 mb-2" htmlFor="username">Username:</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white bg-opacity-20 p-3 mb-4 rounded-xl"
                  required
                />
              </div>
            )}
            <label className="ml-2 mb-2" htmlFor="Email">Email:</label>
            <input
              type="email"
              placeholder="you@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white bg-opacity-20 p-3 mb-4 rounded-xl"
              required
            />
            <label className="ml-2 mb-2" htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white bg-opacity-20 p-3 mb-4 rounded-xl"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>
          <p
            className="mt-4 text-center cursor-pointer text-blue-500"
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Need an account? Sign Up"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
