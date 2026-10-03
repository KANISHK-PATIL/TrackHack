const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/db/db");
const authRoutes = require("./src/routes/authRoutes");
const hackathonRoutes = require("./src/routes/hackathonRoutes");
const trackerRoutes = require("./src/routes/trackerRoutes");
const githubRoutes = require("./src/routes/githubRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "HackTrack API is running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/trackers", trackerRoutes);
app.use("/api/github", githubRoutes);

connectDB();



const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});