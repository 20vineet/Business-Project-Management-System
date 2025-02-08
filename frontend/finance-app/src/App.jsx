import {Routes, Route} from "react-router-dom";
import Register from "./components/Pages/Register";
import Login from "./components/Pages/Login";
import DashboardList from "./components/Pages/DashboardList";
import Dashboard from "./components/Pages/DashBoard";
import DashboardPage from "./components/Pages/DashBoardPage";
import ProjectDetails from "./components/Pages/ProjectDetails";
import AddEditProject from "./components/Pages/AddEditProject";
import EditProject from "./components/Pages/EditProject";
import Home from "./components/Pages/Home";
import EventsPage from "./components/Pages/EventsPage";
import EditEvent from "./components/Pages/EditEvent";
import Account from "./components/Pages/AccountPage";
import UploadProject from "./components/Pages/UploadProject";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboardlist" element={<DashboardList />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/add-project" element={<AddEditProject />} />
        <Route path="/edit-project/:id" element={<EditProject />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/account" element={<Account />} />
        <Route path="/upload-project" element={<UploadProject />} />
      </Routes>
    </div>
  );
}

export default App;
