import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { User } from "lucide-react";
import toast from "react-hot-toast";
import FormButton from "../components/FormButton";

import { ArrowLeft, Loader, Mail } from "lucide-react";

function UpdateProfilePage() {
    const [name, setName] = useState("");
    const  [email, setEmail ] = useState("");  
    const  [bio, setBio ] = useState("");  
   // const [confirmPassword, setConfirmPassword] = useState("");

    const { updateProfile, error, isLoading, message, user} = useAuthStore();

    const {token} = useParams();
    const navigate = useNavigate();

    

    const handleSubmit = async (e) => {
        e.preventDefault();

       /* if(password !== confirmPassword) {
            alert("Password do not match");
            return;
        }*/
        try {

            const profileData = { name, email, bio };
        
            // Pass the profileData to the updateProfile function
            const response = await updateProfile(token, profileData);
            
            toast.success(`${response.message}, redirecting to your Dash...`);
		/*	setTimeout(() => {
				navigate("/");
			}, 2000);*/

        } catch (error) {
            console.error(error);
			toast.error(error.message || "Error updating profile");
        }
    }

  
  
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
                    onChange={ (e) => setEmail(e.target.value) }
                />

                <Input
                    icon={Mail}
                    type="text"
                    placeholder={user?.bio || "Bio - Say a bit about yourself!"}
                    value={bio}
                    onChange={ (e) => setBio(e.target.value) }
                />


                

				
                    {/*

                    <Input
					icon={Lock}
					type='password'
					placeholder='Confirm New Password'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
                    TODO: create 
                    <Button
                    onClick=""
                    /> compnent
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        type='submit'
                        disabled={isLoading}
                    >
                            {isLoading ? "Resetting..." : "Set New Password"}
                    </motion.button>
                    
                    */}
              
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
  )
}

export default UpdateProfilePage