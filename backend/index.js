// index.js
import express from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import cloudinary from './config/cloudinary.js';


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// allows use to accept request from our application
app.use(cors( { origin: "http://localhost:5173", credentials: true } ));
app.use(express.json()); // allows  to parse incoming request with json payloads
// incoming requests are under req.body and data will have josn format
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);

if(process.env.NODE_ENV === "production") {
    app.use( express.static( path.join(__dirname, "frontend/dist") ) );
    app.get("*", (req, res) => {
        res.sendFile( path.resolve(__dirname, "frontend", "dist", "index.html") );
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port ", PORT);
});

