import {Link} from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import {motion} from "framer-motion";
import {CogIcon} from "@heroicons/react/outline"; // Available in v1
import React, {useState} from "react";

// function UploadProject() {
//   return (
//     <div className="flex flex-col min-h-screen bg-white">
//       <Navbar />
//       <main className="flex-grow container mx-auto px-8 py-16 flex flex-col items-center justify-center text-center">
//         <motion.div
//           className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-md"
//           initial={{opacity: 0, y: -20}}
//           animate={{opacity: 1, y: 0}}
//           transition={{duration: 0.5}}
//         >
//           <CogIcon className="w-16 h-16 text-gray-600 mb-4 mx-auto" />
//           <h1 className="text-2xl font-semibold text-gray-800 mb-4">
//             Page Under Maintenance
//           </h1>
//           <p className="text-gray-600 mb-6">
//             We're currently working on this feature. Please check back later.
//           </p>
//           <Link
//             to="/home"
//             className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
//           >
//             Back to Home
//           </Link>
//         </motion.div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default UploadProject;

const UploadProject = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:8000/api/upload/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
      <pre>{response}</pre>
    </div>
  );
};

export default UploadProject;
