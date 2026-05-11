require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 4000;


// ✅ CORS
app.use(cors());


// ✅ MIDDLEWARE
app.use(express.json());


// ✅ DB CONNECTION
require("./conn");


// ✅ ROUTES
const userRoutes = require("./Routes/user");
const resumeRoutes = require("./Routes/resume");
const historyRoutes = require("./Routes/history");


// ✅ API ROUTES
app.use("/api/user", userRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/history", historyRoutes);


// ✅ SERVER
app.listen(PORT, () => {

    console.log("Backend is running on", PORT);

});