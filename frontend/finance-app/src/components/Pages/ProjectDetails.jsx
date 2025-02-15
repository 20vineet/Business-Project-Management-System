import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
// Import the fetchProjectById function
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import axios from "axios";

function ProjectDetails() {
  const [project, setProject] = useState(null);
  const [events, setEvents] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        // const data = await fetchProjects(); // Fetch projects using apiService
        const response = await axios.get(
          `http://localhost:8080/api/projects/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setProject(response.data);
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    getProjectDetails(); // Call the function to fetch project data
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{project.title}</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Project Details</h2>
          <p>
            <strong>Project Id:</strong> {project.id}
          </p>
          <p>
            <strong>Project Title:</strong> {project.title}
          </p>
          <p>
            <strong>Description:</strong> {project.description}
          </p>
          <p>
            <strong>Start date:</strong> {project.startDate}
          </p>
          <p>
            <strong>End date:</strong> {project.endDate}
          </p>
          <p>
            <strong>Client Contact Email:</strong> {project.contactEmail}
          </p>
          <p>
            <strong>Status:</strong> {project.status}
          </p>
          <Link
            to={`/edit-project/${project.id}`}
            className="mt-4 inline-block px-6 py-2 text-white bg-gray-800 rounded-lg hover:bg-blue-900"
          >
            Edit Project
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Project Events</h2>
          <ul>
            {events.length > 0 ? (
              events.map((event) => (
                <li key={event.id} className="mb-2">
                  <span className="font-semibold">Event Id: {event.id}</span>
                  <br />
                  <span className="font-semibold">{event.title}</span>
                  <br />
                  <span className="text-sm text-gray-600">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </span>
                </li>
              ))
            ) : (
              <p>No events available for this project.</p>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProjectDetails;
