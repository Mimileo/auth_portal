import mongoose from "mongoose";

const userSchema = mongoose.Schema( {
    email: { // email will have multpiple fields so it's an object
        type: String,
        required: true, // make this required
        unique: true    // makes this unique
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String, // You can use `String` for text fields
        default: "" // Default value if not provided
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String, 
    resetPasswordExpiresAt: Date,
    verificationToken: String,   
    verificationTokenExpiresAt: Date, 
}, {timestamps:true} )


export const User = mongoose.model('User', userSchema);