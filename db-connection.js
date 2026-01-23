const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("studentmanagementapi", "root", "SQL@2026", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
