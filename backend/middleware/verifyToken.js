import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // extract our "tooken" from the request cookies
    // we need to add middleware to do this

  
    if(!token) return res.status(401).json({ success: false, message: "unauthorized - no token provided" });
    try { 
        // use the same scret to decode this and try to verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) return res.status(401).json({ success: false, message: "unauthorized - invalid token" });
       
        req.userId = decoded.userId;
        // If the token is valid and decoded successfully, extracts userId from token’s payload and 
        // attaches it to the req object as req.userId.
        //  userId can  be used in subsequent middleware/route handlers to identify the authenticated user.

        // here we call the third parameter, which is checkAuth(middleware function), if the decoded token is valid
        next();
    } catch (error) {
        console.log("Error in verifyToken ", error);
		return res.status(500).json({ success: false, message: "Server error" });
    }
};