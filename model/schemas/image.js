import connection from "../connection.js";
import { DataTypes } from "sequelize";

const image = connection.define("Image", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default image;
