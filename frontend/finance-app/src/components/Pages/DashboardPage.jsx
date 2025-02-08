import { useState } from "react";
import { FaTh, FaListUl } from "react-icons/fa"; // Import Font Awesome icons
import Dashboard from "./DashBoard"; // Import the Dashboard component
import DashboardList from "./DashboardList"; // Import the DashboardList component
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

function DashboardPage() {
  const [viewMode, setViewMode] = useState("cards"); // Default view is 'cards'

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
