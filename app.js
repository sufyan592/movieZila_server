const express = require("express");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/userRoutes");
const movieRoute = require("./routes/movieRoutes");
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/movie", movieRoute);

module.exports = app;
