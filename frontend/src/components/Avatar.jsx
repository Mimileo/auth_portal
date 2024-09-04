import { UploadCloudIcon } from 'lucide-react';
import { useState } from 'react';

const Avatar = ({ onUpload, name, profilePicture }) => {
    const [preview, setPreview] = useState(profilePicture || null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onUpload(file); // Pass the file to parent
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
                <img
                    src={preview || `https://ui-avatars.com/api/?name=${name}`}
                    alt="Avatar Preview"
                    className="w-full h-full rounded-full object-cover border-2 border-gray-300"
                />
                <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-cyan-300 p-2 rounded-full cursor-pointer">
                    <UploadCloudIcon className="h-6 w-6 text-white " />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </label>
            </div>
            <p className="my-4 text-sm text-green-400 hover:text-green-300">Upload your profile picture</p>
        </div>
    );
};


export default Avatar