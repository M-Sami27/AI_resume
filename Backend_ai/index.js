const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// routes
app.use("/api/user", require("./Routes/user"));
app.use("/api/resume", require("./Routes/resume"));
app.use("/api/history", require("./Routes/history"));

// test route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});