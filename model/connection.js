import { Sequelize } from "sequelize";

const connection = new Sequelize("Havre", "root", "JD@rootJD", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  await connection.authenticate();
  console.log("Connection has been established successfully.");
})();

export default connection;
