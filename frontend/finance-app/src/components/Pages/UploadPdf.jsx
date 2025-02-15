import {Link} from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import {motion} from "framer-motion";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function UploadPdf() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

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

    if (!res.ok) {
      throw new Error("File upload failed.");
    }

    const data = await res.json();
    console.log(data);
    localStorage.setItem("formData", JSON.stringify(data));
    // localStorage.setItem("formData", data);
    navigate("/edit-uploaded-pdf-data");

    setResponse(JSON.stringify(data, null, 2));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-8 py-16 flex flex-col items-center justify-center text-center">
        <motion.div
          className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-md"
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
        >
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Upload PDF File
          </h1>
          <input
            type="file"
            // accept=".pdf"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
          >
            Upload
          </button>
          <pre>{response}</pre>
          <p className="text-gray-600 mt-4">
            Please upload a PDF file for processing.
          </p>
          <Link to="/home" className="block mt-4 text-blue-500 hover:underline">
            Back to Home
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default UploadPdf;
