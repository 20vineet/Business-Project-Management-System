// import {useState} from "react";
// import {Link, useNavigate} from "react-router-dom";
// import {motion} from "framer-motion";
// import {LockClosedIcon} from "@heroicons/react/outline"; // Importing Heroicons
// import {login} from "../api/authApi"; // Importing login function from authApi.js
// import axios from "axios";
// // import {login} from ""; // Importing login function from authApi.js

// function Login() {
//   const [formData, setFormData] = useState({username: "", password: ""});
//   const [error, setError] = useState(""); // State to handle errors
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear any previous errors

//     try {
//       console.log(formData);
//       // const response = await login(formData); // Call API function
//       const response = await axios
//         .post("http://localhost:8080/auth/authenticate", formData)
//         .then((response) => {
//           const token = response.data;

//           // Save token in local storage
//           localStorage.setItem("token", token);
//           localStorage.setItem("username", formData.username);
//           localStorage.setItem("tokenTimestamp", new Date().getTime());

//           // console.log(response);

//           // console.log("Token : " + token);
//         });

//       console.log("Login successful:", response);

//       navigate("/home"); // Redirect to home after successful login
//     } catch (error) {
//       setError(error.response?.data?.message || "Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full sm:w-96">
//         <motion.h3
//           className="text-2xl font-bold text-center text-gray-800 mb-8"
//           initial={{opacity: 0}}
//           animate={{opacity: 1}}
//           transition={{duration: 0.8}}
//         >
//           Login to your account
//         </motion.h3>

//         {error && <div className="text-red-500 text-center mb-4">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <motion.div
//             className="mt-4"
//             initial={{opacity: 0}}
//             animate={{opacity: 1}}
//             transition={{duration: 0.5}}
//           >
//             <label className="block text-gray-600" htmlFor="username">
//               Username
//             </label>
//             <input
//               type="text"
//               placeholder="Username"
//               name="username"
//               className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//               onChange={handleChange}
//               required
//             />
//           </motion.div>

//           <motion.div
//             className="mt-4"
//             initial={{opacity: 0}}
//             animate={{opacity: 1}}
//             transition={{duration: 0.5}}
//           >
//             <label className="block text-gray-600">Password</label>
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//               onChange={handleChange}
//               required
//             />
//           </motion.div>

//           <div className="flex items-baseline justify-between mt-6">
//             <button
//               type="submit"
//               className="px-6 py-2 mt-4 text-white bg-gray-800 rounded-lg hover:bg-gray-900 w-full transform transition duration-300 ease-in-out hover:scale-105"
//             >
//               Login
//             </button>
//           </div>

//           <div className="mt-4 text-center">
//             <Link
//               to="/register"
//               className="text-sm text-blue-600 hover:underline"
//             >
//               Don't have an account? Register
//             </Link>
//           </div>
//         </form>

//         <div className="mt-6 flex justify-center items-center">
//           <LockClosedIcon className="w-6 h-6 text-gray-600" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {LockClosedIcon} from "@heroicons/react/outline";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({username: "", password: ""});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/authenticate",
        formData
      );

      const token = response.data;

      // Save token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", formData.username);
      localStorage.setItem("tokenTimestamp", new Date().getTime());

      console.log("Login successful:", response);
      navigate("/home"); // Redirect to home after login
    } catch (error) {
      console.error("Login failed:", error.response);

      // Check if error response exists and display the backend message
      if (error.response && error.response.status === 401) {
        setError(error.response.data.message || "Invalid credentials!");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
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
          Login to your account
        </motion.h3>

        {/* Display error message if login fails */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

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
              name="username"
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
              Login
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/register"
              className="text-sm text-blue-600 hover:underline"
            >
              Don't have an account? Register
            </Link>
          </div>
        </form>

        <div className="mt-6 flex justify-center items-center">
          <LockClosedIcon className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </div>
  );
}

export default Login;
