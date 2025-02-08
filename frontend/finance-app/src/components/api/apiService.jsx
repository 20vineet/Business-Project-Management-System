import axios from "axios";

const API_URL = "http://localhost:8080/";

// Fetch all projects
export const fetchProjects = async () => {
  // const response = await axios.get(`${API_URL}/projects`);
  // return response.data;
  const response = async () => {
    return axiosInstance.get("/api/projects");
  };
  return response.data;
};

// Fetch a single project by ID
export const fetchProjectById = async (id) => {
  const response = await axios.get(`${API_URL}/projects/${id}`);
  return response.data;
};

// Add a new project
export const addProject = async (projectData) => {
  const response = await axios.post(`${API_URL}/projects`, projectData);
  return response.data;
};

// Update an existing project
export const updateProject = async (id, projectData) => {
  const response = await axios.put(`${API_URL}/projects/${id}`, projectData);
  return response.data;
};

// Fetch events for a project
export const fetchEvents = async () => {
  const response = await axios.get(`${API_URL}/projects/upcoming-events`);
  return response.data;
};

// Add a new event
export const addEvent = async (eventData) => {
  const response = await axios.post(`${API_URL}/events`, eventData);
  return response.data;
};

// Update an existing event
export const updateEvent = async (id, eventData) => {
  const response = await axios.put(`${API_URL}/events/${id}`, eventData);
  return response.data;
};
