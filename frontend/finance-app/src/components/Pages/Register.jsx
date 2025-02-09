import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roles: "ROLE_ADMIN",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the registration data to your backend
    console.log("Registration data:", formData);
    try {
      console.log(formData);
      // const response = await login(formData); // Call API function
      const response = await axios
        .post("http://localhost:8080/auth/signup", formData)
        .then((response) => {
          const token = response.data;

          // Save token in local storage
          // localStorage.setItem("token", token);
          // localStorage.setItem("username", formData.username);
          // console.log(response);

          // console.log("Token : " + token);
        });

      console.log("Login successful:", response);

      navigate("/login"); // Redirect to home after successful login
    } catch (error) {
      setError(error.response?.data?.message || "Unokown error occured");
    }
    // For demo purposes, we'll just redirect to the login page
    // navigate("/login"); // Redirecting after registration
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full sm:w-96">
        <motion.h3
          className="text-2xl font-bold text-center text-gray-800 mb-8"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.8}}
        >
          Register for an account
        </motion.h3>

        <form onSubmit={handleSubmit}>
          <motion.div
            className="mt-4"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
          >
            <label className="block text-gray-600" htmlFor="username">
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
      </div>
    </div>
  );
}

export default Register;
