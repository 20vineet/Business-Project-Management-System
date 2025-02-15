// import {useState, useEffect} from "react";
// import {useParams, useNavigate} from "react-router-dom";
// import {fetchProjectById, updateProject} from "../api/apiService"; // Import from apiService
// import Navbar from "../Layout/Navbar";
// import Footer from "../Layout/Footer";
// import axios from "axios";

// function EditProject() {

//   const [formData, setFormData] = useState({
//     // name: "",
//     // description: "",
//     // status: "",
//   });

//   const [project, setProject] = useState();

//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate();

//   //   useEffect(() => {
//   //     setProjectData(JSON.parse(localStorage.getItem("formData")));
//   //     if (projectData.events) {
//   //       setEvents(projectData.events);
//   //     }
//   //   }, []);

//   //   console.log(projectData);

//   //   const projectData = location.state;
//   let projectData = JSON.parse(localStorage.getItem("formData"));
//   console.log(projectData);

//   //   setEvents(projectData.events);
//   useEffect(() => {
//     setProject(projectData);
//     if (projectData.events) {
//       setEvents(projectData.events);
//     }
//   }, []);
//   console.log("Project Data : ", project);

//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Updated Project data:", formData);
//     // Send the updated data to the backend using apiService function
//     try {
//       const token = localStorage.getItem("token");
//       //   console.log(token);

//       projectData.startDate = generateDateTimeWithDefaultTime(
//         projectData.startDate
//       );

//       projectData.endDate = generateDateTimeWithDefaultTime(
//         projectData.endDate
//       );

//       console.log("Project Data : " + JSON.stringify(projectData));
//       navigate("/dashboard"); // Navigate to dashboard after update
//     } catch (err) {
//       console.log(err);
//       //   console.log("ID: ", id);
//       console.log(formData);
//     }
//   };

//   function generateDateTimeWithDefaultTime(dateString) {
//     const [year, month, day] = dateString.split("-");
//     const targetDate = new Date(Date.UTC(year, month - 1, day, 9, 0, 0, 0));
//     return targetDate.toISOString();
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-8">Edit Project Details</h1>
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-md rounded-lg p-6"
//         >
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="name"
//             >
//               Project Id : {projectData.id}
//             </label>
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="name"
//             >
//               Project Name
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="name"
//               type="text"
//               name="title"
//               value={projectData.title}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="description"
//             >
//               Description
//             </label>
//             <textarea
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="description"
//               name="description"
//               value={projectData.description}
//               onChange={handleChange}
//               rows="4"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="name"
//             >
//               Project start date : {projectData.startDate}
//             </label>
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="name"
//             >
//               Project end date : {projectData.endDate}
//             </label>
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="status"
//             >
//               Status
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="status"
//               name="status"
//               value={projectData.status}
//               onChange={handleChange}
//               required
//             >
//               <option value="Planning">Planning</option>
//               <option value="In_Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="name"
//               >
//                 Project Events :
//               </label>
//             </div>
//             <ul>
//               {events.map((event) => (
//                 <li key={event.id} className="mb-2">
//                   <span className="font-semibold">Event id : {event.id}</span>
//                   <br />
//                   <span className="font-semibold">{event.title}</span>
//                   <br />
//                   <span className="text-sm text-gray-600">
//                     {event.eventDate}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Update Project
//             </button>
//           </div>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default EditProject;
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import axios from "axios";

function EditProject() {
  // Initialize project data from localStorage
  const [projectData, setProjectData] = useState(() => {
    const storedData = localStorage.getItem("formData");
    return storedData ? JSON.parse(storedData) : {};
  });

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Populate events when projectData is available
  useEffect(() => {
    if (projectData.events) {
      const updatedEvents = projectData.events.map((event) => ({
        ...event,
        eventDate: generateDateTimeWithDefaultTime(event.eventDate),
      }));
      setEvents(updatedEvents);
    }
  }, [projectData]);

  // Handle form input changes
  const handleChange = (e) => {
    const {name, value} = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (adding a new project)
  const handleSubmit = async (e) => {
    e.preventDefault();

    projectData.startDate = generateDateTimeWithDefaultTime(
      projectData.startDate
    );
    projectData.endDate = generateDateTimeWithDefaultTime(projectData.endDate);
    projectData.events = events; // Ensure events are updated in projectData

    console.log("New Project Data:", projectData);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/api/projects", // Change to POST request
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Project added successfully!", response.data);
      navigate("/dashboard"); // Redirect after adding
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  function generateDateTimeWithDefaultTime(dateString) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    const targetDate = new Date(Date.UTC(year, month - 1, day, 9, 0, 0, 0));
    return targetDate.toISOString();
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Add Project</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Project Name
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="text"
              name="title"
              value={projectData.title || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              name="description"
              value={projectData.description || ""}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Start Date
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="date"
              name="startDate"
              value={projectData.startDate || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              End Date
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="date"
              name="endDate"
              value={projectData.endDate || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              name="status"
              value={projectData.status || ""}
              onChange={handleChange}
              required
            >
              <option value="Planning">Planning</option>
              <option value="In_Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Project Events:
            </label>
            <ul>
              {events.map((event) => (
                <li key={event.id} className="mb-2">
                  <span className="font-semibold">Event id: {event.id}</span>
                  <br />
                  <span className="font-semibold">{event.title}</span>
                  <br />
                  <span className="text-sm text-gray-600">
                    Event Date: {event.eventDate}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default EditProject;
