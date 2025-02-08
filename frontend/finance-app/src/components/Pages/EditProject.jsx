import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {fetchProjectById, updateProject} from "../api/apiService"; // Import from apiService
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import axios from "axios";

function EditProject() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
  });
  const [events, setEvents] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch project data based on id using the apiService function
    const getProjectData = async () => {
      //   try {
      //     const project = await fetchProjectById(id); // Fetch project by id
      //     console.log(project);
      //     setFormData(project);
      //     setEvents(project.events);
      //   } catch (error) {
      //     console.error("Error fetching project data:", error);
      //   }
      // };
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
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    getProjectData(); // Fetch data when component mounts
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Project data:", formData);
    // Send the updated data to the backend using apiService function
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      // const updatedProject = await updateProject(id, formData);
      const response = await axios.put(
        `http://localhost:8080/api/projects/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      console.log("Project data updated!");
      navigate("/dashboard"); // Navigate to dashboard after update
    } catch (err) {
      console.log(err);
      console.log("ID: ", id);
      console.log(formData);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Project Id : {formData.id}
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Project Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Project start date : {formData.startDate}
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Project end date : {formData.endDate}
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Planning">Planning</option>
              <option value="In_Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Project Events :
              </label>
            </div>
            <ul>
              {events.map((event) => (
                <li key={event.id} className="mb-2">
                  <span className="font-semibold">Event id : {event.id}</span>
                  <br />
                  <span className="font-semibold">{event.title}</span>
                  <br />
                  <span className="text-sm text-gray-600">
                    {event.eventDate}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Project
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default EditProject;
