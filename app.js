const express = require("express");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/userRoutes");
const movieRoute = require("./routes/movieRoutes");
// const userPermissionRoute = require("./routes/userPermissionRoutes");
// const favMovieRoute = require("./routes/favMoviesRoutes");
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRoute);
// app.use("/api/v1/users", userPermissionRoute);
app.use("/api/v1/movie", movieRoute);
// app.use("/api/v1/movie", favMovieRoute);

module.exports = app;
