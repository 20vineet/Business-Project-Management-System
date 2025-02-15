import {Link} from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import {
  BriefcaseIcon,
  PlusCircleIcon,
  CalendarIcon,
  UploadIcon,
} from "@heroicons/react/outline"; // Assuming you're using Heroicons v1
import {motion} from "framer-motion";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-8 py-16">
        <motion.h1
          className="text-3xl font-semibold text-center text-gray-800 mb-12"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.8}}
        >
          Welcome to Business Finance Management Application
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
          {/* Top Row */}
          <motion.div
            className="flex flex-col items-center"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
          >
            <Link
              to="/dashboard"
              className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-4 px-8 w-full max-w-md text-center text-lg rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
            >
              <BriefcaseIcon className="w-6 h-6 mb-2 mx-auto" />
              View All Projects
            </Link>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.2}}
          >
            <Link
              to="/add-project"
              className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-4 px-8 w-full max-w-md text-center text-lg rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
            >
              <PlusCircleIcon className="w-6 h-6 mb-2 mx-auto" />
              Add New Project
            </Link>
          </motion.div>

          {/* Bottom Row */}
          <motion.div
            className="flex flex-col items-center"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.4}}
          >
            <Link
              to="/events"
              className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-4 px-8 w-full max-w-md text-center text-lg rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
            >
              <CalendarIcon className="w-6 h-6 mb-2 mx-auto" />
              Upcoming Events
            </Link>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.6}}
          >
            <Link
              to="/upload-pdf"
              className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-4 px-8 w-full max-w-md text-center text-lg rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
            >
              <UploadIcon className="w-6 h-6 mb-2 mx-auto" />
              Upload Project using Pdf
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
