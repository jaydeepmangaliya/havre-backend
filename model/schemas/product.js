import connection from "../connection.js";

import { DataTypes } from "sequelize";

const product = connection.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serving: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default product;
