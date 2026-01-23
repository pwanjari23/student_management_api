const express = require("express");
const db = require("./utils/db-connection");
const bodyParser = require("body-parser");

const studentRoutes = require("./routes/studentRoute");
require('./models');
const sequelize = require('./utils/db-connection'); // correct relative path
const { Students, IdentityCard } = require('./models/index');

sequelize.sync({ alter: true }) 
  .then(() => console.log("Database synced"))
  .catch(err => console.error(err));

const app = express();
app.use(bodyParser.json());

app.use("/students", studentRoutes);

const PORT = 3000;

// db.sync({ force: true })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
