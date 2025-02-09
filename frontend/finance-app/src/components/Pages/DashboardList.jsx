import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {fetchProjects} from "../api/apiService"; // Importing from the new service
// import Navbar from "../Layout/Navbar"; // Import Navbar

function DashboardList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from your API
    const token = localStorage.getItem("token");
    // console.log(token);
    const getProjects = async () => {
      try {
        // const data = await fetchProjects(); // Fetch projects using apiService
        const response = await axios.get("http://localhost:8080/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    getProjects(); // Call the async function to fetch projects
  }, []);

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

  if (!projects.length) {
    return <div className="text-center text-lg">No projects available.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* <Navbar /> */}
      <div className="container mx-auto px-6 py-12">
        {/* <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Projects
        </h1> */}

        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full md:w-3/4 lg:w-full px-4">
            {/* <h2 className="text-2xl font-semibold text-gray-700 mb-6">Projects</h2> */}

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <table className="min-w-full table-auto text-sm text-gray-600">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left">Serial No</th>
                    <th className="py-3 px-4 text-left">Title</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-gray-50 transition duration-300 ease-in-out"
                    >
                      <td className="py-3 px-4">{project.id}</td>
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {project.title}
                      </td>
                      <td className="py-3 px-4">{project.status}</td>
                      <td className="py-3 px-4">
                        <Link
                          to={`/project/${project.id}`}
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-6">
              <Link
                to="/add-project"
                className="inline-block px-6 py-3 text-white bg-gray-800 rounded-lg shadow-lg hover:bg-gray-900 transition duration-200 ease-in-out transform hover:scale-105"
              >
                Add New Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardList;
