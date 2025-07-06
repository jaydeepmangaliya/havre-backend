import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const connection = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

(async () => {
  await connection.authenticate();
  console.log("Connection has been established successfully.");
})();

export default connection;
