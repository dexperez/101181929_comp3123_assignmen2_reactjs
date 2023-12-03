const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const employeeRoutes = require("./routes/employee");

const app = express();
const apiv1 = express();
const SERVER_PORT = 8080;

// Database
const DB_CONNECTION_STRING =
  "mongodb+srv://vandexterperez:adminpassword@cluster0.kfkpicy.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware for parsing JSON and url-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Specify the 'extended' option

// Routes
apiv1.use("/user", userRoutes);
apiv1.use("/emp", employeeRoutes);
app.use("/api/v1", apiv1);

app.get("/", (req, res) => {
  res.send("<h1>Van Dexter Perez - Assignment 1</h1>");
});

app.listen(SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});
