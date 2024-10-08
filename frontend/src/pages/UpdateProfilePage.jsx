import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useParams } from "react-router-dom";
import Input from "../components/Input";
import Avatar from "../components/Avatar";
import FormButton from "../components/FormButton";
import BioEditor from "../components/BioEditor";
import toast from "react-hot-toast";
import { User, Mail } from "lucide-react";
import DOMPurify from 'dompurify';
import { useNavigate } from "react-router-dom";


function UpdateProfilePage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");  
    const [profilePicture, setProfilePicture] = useState(null);

    const navigate = useNavigate();



    const { updateProfile, error, isLoading, message, user } = useAuthStore();
    const { token } = useParams();
   
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio || "");  // Ensure bio is initialized properly
        }
    }, [user]);

    const handleUpload = (file) => {
        setProfilePicture(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const sanitizedBio = DOMPurify.sanitize(bio, {
                ALLOWED_TAGS: ['h1', 'h2', 'h3', 'p', 'b', 'i', 'strong', 'em', 'u', 'a','br'],
                ALLOWED_ATTR: ['href', 'target', 'rel'],
            });

            const profileData = new FormData();
            profileData.append("name", name);
            profileData.append("email", email);
            profileData.append("bio", sanitizedBio);
            if (profilePicture) {
                profileData.append("profilePicture", profilePicture);
            }
            for (const [key, value] of profileData.entries()) {
                console.log(`Form ---- ${key}:  ${value}`);
            }
            const response = await updateProfile(token, profileData);
            toast.success(`${response.message}`);
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Error updating profile");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
        >
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Update Your Profile
                </h2>
                
                {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
                {message && <p className='text-green-500 text-sm mb-4'>{message}</p>}

                <form onSubmit={handleSubmit}>
                    <Avatar 
                        onUpload={handleUpload} 
                        name={user.name}
                        profilePicture={user.profilePicture} 
                    />
                    <Input
                        icon={User}
                        type='text'
                        placeholder={user?.name || "Full Name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        icon={Mail}
                        type="email"
                        placeholder={user?.email || "Email Address"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <BioEditor
                        value={bio}
                        onChange={setBio}
                    />
                    <FormButton
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        type='submit'
                        disabled={isLoading}
                        text={isLoading ? "Updating..." : "Update Profile"}
                    />
                </form>
            </div>
        </motion.div>
    );
}

export default UpdateProfilePage;
