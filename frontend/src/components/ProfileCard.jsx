import { motion } from "framer-motion";

const ProfileCard = ({ user }) => {
  return (
    <motion.div
      className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-xl font-semibold text-green-400 mb-3">Profile Information</h3>
      <p className="text-gray-300">
        <span className="font-bold">Name: </span> {user.name}
      </p>
      <p className="text-gray-300">
        <span className="font-bold">Email: </span> {user.email}
      </p>
      <p className="text-gray-300">
        <span className="font-bold">Bio: </span> <article>{user.bio}</article>
      </p>
    </motion.div>
  );
};

export default ProfileCard;
