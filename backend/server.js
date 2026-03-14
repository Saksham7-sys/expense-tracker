const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// connect database
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(process.env.PORT, () => {
  console.log("Server started on port 5000");
});
// Added lower line after  creatinng authroutes
const authRoutes = require("./routes/AuthRoutes");
app.use("/api/auth", authRoutes); // when ever server listen /api/auth it will send to auth request