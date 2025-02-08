import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {fetchEvents, updateEvent} from "../api/apiService"; // need to change this to fetch only event of specific id add- fetchEventsByID
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

function EditEvent() {
  const {eventId} = useParams(); // Get eventId from the URL
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    id: eventId, // Initialize with eventId
    title: "",
    description: "",
    eventDate: "",
    notificationPreference: "ON_DAY", // Default value for notification preference
  });

  // Fetch event details by ID when the component mounts
  useEffect(() => {
    fetchEvents(eventId)
      .then((response) => {
        setEventData(response);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });
  }, [eventId]);

  // Handle input changes for event fields
  const handleChange = (e) => {
    setEventData({...eventData, [e.target.name]: e.target.value});
  };

  // Submit updated event data
  const handleSubmit = (e) => {
    e.preventDefault();
    updateEvent(eventId, eventData)
      .then(() => {
        navigate("/events"); // Navigate back to events list after update
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Edit Event</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          {/* Event ID (Read-Only) */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="id"
            >
              Event ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="id"
              value={eventData.id}
              readOnly
            />
          </div>

          {/* Event Title */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Event Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Event Description */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          {/* Event Date */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="eventDate"
            >
              Event Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              name="eventDate"
              value={eventData.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Notification Preference (Enum) */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="notificationPreference"
            >
              Notification Preference
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="notificationPreference"
              value={eventData.notificationPreference}
              onChange={handleChange}
            >
              <option value="ON_DAY">On Day</option>
              <option value="BEFORE_ONE_DAY">Before One Day</option>
              <option value="BEFORE_THREE_DAYS">Before Three Days</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Event
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default EditEvent;
