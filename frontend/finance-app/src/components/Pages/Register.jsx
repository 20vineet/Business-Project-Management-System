import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";
import {CheckCircleIcon} from "@heroicons/react/outline";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roles: "ROLE_ADMIN",
  });
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // Success state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:8080/auth/signup", formData);

      console.log("Registration successful:", response);

      // Show success popup
      setShowSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration failed:", error.response);
      setError(error.response?.data?.message || "Unknown error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full sm:w-96 relative">
        <motion.h3
          className="text-2xl font-bold text-center text-gray-800 mb-8"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.8}}
        >
          Register for an account
        </motion.h3>

        {/* Display error message if registration fails */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <motion.div
            className="mt-4"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
          >
            <label className="block text-gray-600" htmlFor="name">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              name="name"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div
            className="mt-4"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
          >
            <label className="block text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div
            className="mt-4"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
          >
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={handleChange}
              required
            />
          </motion.div>

          <div className="flex items-baseline justify-between mt-6">
            <button
              type="submit"
              className="px-6 py-2 mt-4 text-white bg-gray-800 rounded-lg hover:bg-gray-900 w-full transform transition duration-300 ease-in-out hover:scale-105"
            >
              Register
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </form>

        {/* Success Popup */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -20}}
              transition={{duration: 0.4}}
              className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
            >
              <CheckCircleIcon className="w-5 h-5" />
              <span>Registration Successful!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Register;
