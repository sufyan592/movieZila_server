const app = require("./app");
const { sequelize } = require("./models/index");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8005;

sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized");
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
});
// sequelize
//   .authenticate()
//   .then(() => {
//     // sequelize.sync();
//     console.log("DB connected");
//   })
//   .catch((err) => {
//     // console.log("Inside catch Config Variables:", Config);
//     console.log("Inside catch Sequilize Initialize:", sequelize);
//     console.log("Unable to connect to the database:", err);
//   });
