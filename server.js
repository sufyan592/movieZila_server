const app = require("./app");
const { sequelize } = require("./models/index");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 21699;

sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized");
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
});
