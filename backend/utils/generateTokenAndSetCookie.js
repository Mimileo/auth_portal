// backend/utils/generateTokenAndSetCookie.js
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
   
    res.cookie("token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict", // prevents csrf attack
        // prevent Cross-Site Request Forgery (CSRF) attacks by restricting how cookies are sent with cross-site requests. 
        // Strict: The cookie is only sent if the request is from the same site.
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
};