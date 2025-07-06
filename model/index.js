import connection from "./connection.js";
import { Sequelize } from "sequelize";
import user from "./schemas/users.js";
import logActivity from "./schemas/logActivity.js";
import product from "./schemas/product.js";
import image from "./schemas/image.js";
import order from "./schemas/orders.js";
import admin from "./schemas/admin.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = connection;

db.user = user;
db.logActivity = logActivity;
db.product = product;
db.image = image;
db.order = order;
db.admin = admin;

db.product.hasMany(db.image, { foreignKey: "product_id", as: "images" });
db.image.belongsTo(db.product, { foreignKey: "product_id" });

export default db;
