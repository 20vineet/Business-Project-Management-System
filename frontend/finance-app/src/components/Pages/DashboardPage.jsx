import {useState, useEffect} from "react";
import {FaTh, FaListUl} from "react-icons/fa";
import {useNavigate} from "react-router-dom"; // Import Font Awesome icons
import Dashboard from "./DashBoard"; // Import the Dashboard component
import DashboardList from "./DashboardList"; // Import the DashboardList component
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

function DashboardPage() {
  const [viewMode, setViewMode] = useState("cards"); // Default view is 'cards'

  const navigate = useNavigate(); // Initialize useNavigate

  // Function to check if token is expired
  const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    const tokenTimestamp = localStorage.getItem("tokenTimestamp");

    if (!token || !tokenTimestamp) {
      return true; // If token or timestamp is missing, consider it expired
    }

    const expirationTime = 60 * 60 * 1000; // 1 hour in milliseconds
    const currentTime = new Date().getTime();

    return currentTime - parseInt(tokenTimestamp, 10) > expirationTime;
  };

  useEffect(() => {
    if (isTokenExpired()) {
      localStorage.removeItem("token"); // Clear expired token
      localStorage.removeItem("tokenTimestamp"); // Clear timestamp
      navigate("/login"); // Redirect to login page
    }

    // Set interval to check token expiration every minute
    const interval = setInterval(() => {
      if (isTokenExpired()) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenTimestamp");
        navigate("/login");
      }
    }, 60000); // Check every 1 minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      navigate("/login"); // Redirect to login page if token is missing
    }
  }, [navigate]); // Runs only on component mount

  const toggleViewMode = () => {
    setViewMode(viewMode === "cards" ? "list" : "cards"); // Toggle view mode
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          {/* Center the heading */}
          <h1 className="text-4xl font-extrabold text-gray-800 flex-1 text-center">
            Projects
          </h1>

          {/* Right side: Icons for toggling views */}
          <div className="flex items-center space-x-4 ml-auto">
            <button
              onClick={toggleViewMode}
              className="text-xl text-gray-800 rounded-md p-2 hover:bg-gray-200 transition duration-200"
            >
              {/* Icon for list view */}
              {viewMode === "cards" ? (
                <FaListUl className="text-2xl" />
              ) : (
                <FaTh className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {viewMode === "cards" ? (
          <Dashboard /> // Render card view (Dashboard)
        ) : (
          <DashboardList /> // Render list view (DashboardList)
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DashboardPage;
