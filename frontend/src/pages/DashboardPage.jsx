import { motion } from "framer-motion";
import { formatDate } from "../utils/date";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import '../styles/dash.bio.styles.css';  

import FormButton from "../components/FormButton";
import { Edit } from "lucide-react";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleEditProfile = () => {
    navigate("/update-profile");  // Navigating to the update profile page
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800 flex flex-col md:flex-row"
    >
      {/* Left Column: Avi and Account Activity */}
      <div className="md:w-1/3 flex flex-col items-center space-y-6">
        {/* Avi */}
        <div className="flex justify-center items-center">
          <img
            src={ user.profilePicture || "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"}
            alt="Profile"
            className="w-48 h-48 object-cover rounded-full border-4 border-emerald-500 shadow-lg"
          />
        </div>

        {/* Account Activity */}
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3">Account Activity</h3>
          <p className="text-gray-300">
            <span className="font-bold">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-300">
            <span className="font-bold">Last Login: </span>
            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
      </div>

      {/* Right Column: Profile Details */}
      <div className="md:w-2/3 md:pl-8 mt-8 md:mt-0 space-y-6">
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
          Dashboard
        </h2>

        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3 flex items-center justify-between">
			      Profile Information
			    <Edit
			
              className="text-gray-400 hover:text-green-400"
              onClick={handleEditProfile}  // Handle click to navigate to update profile page
              title="Edit Profile"
            />
          </h3>
            <p className="text-gray-300 mb-2">
              <span className="font-bold">Name: </span> {user.name}
            </p>
            <p className="text-gray-300 mb-2">
              <span className="font-bold">Email: </span> {user.email}
            </p>
            <p className="text-gray-300 mb-2">
              <span className="font-bold">Bio: </span> 
              <span className="dash-bio" dangerouslySetInnerHTML={{ __html: user.bio }} />
            </p>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <FormButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            text="Logout"
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
