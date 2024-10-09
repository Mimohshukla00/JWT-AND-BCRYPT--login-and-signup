const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// db connection
const dbConnection = require("./config/db");
dbConnection();

// middleware
app.use(express.json());
const userRoutes = require("./routes/Route");
app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
