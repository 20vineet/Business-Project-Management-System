import {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {FaUserCircle} from "react-icons/fa"; // Profile icon
import axios from "axios";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

function Account() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    // Fetch projects from your API
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    // console.log(token);
    const getUserDetails = async () => {
      try {
        // const data = await fetchProjects(); // Fetch projects using apiService
        const response = await axios.get(
          `http://localhost:8080/api/users/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    getUserDetails(); // Call the async function to fetch projects
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <motion.div
          className="w-full sm:w-96 bg-white shadow-lg rounded-3xl p-8"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.8}}
        >
          {/* Profile Icon */}
          <div className="flex justify-center mb-6">
            <FaUserCircle className="w-28 h-28 text-gray-500" />
          </div>

          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Account Details
          </h3>

          {/* User Information */}
          <div className="space-y-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Username</span>
              <span className="font-semibold text-gray-800">
                {userData.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email</span>
              <span className="font-semibold text-gray-800">
                {userData.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Role</span>
              <span className="font-semibold text-gray-800">
                {userData.roles}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

export default Account;
