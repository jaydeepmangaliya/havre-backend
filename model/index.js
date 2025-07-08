import connection from "./connection.js";
import { Sequelize } from "sequelize";
import user from "./schemas/users.js";
import logActivity from "./schemas/logActivity.js";
import product from "./schemas/product.js";
import image from "./schemas/image.js";
import order from "./schemas/orders.js";
import admin from "./schemas/admin.js";
import orderProduct from "./schemas/orderProduct.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = connection;

db.user = user;
db.logActivity = logActivity;
db.product = product;
db.image = image;
db.order = order;
db.admin = admin;
db.orderProduct = orderProduct;

db.product.hasMany(db.image, { foreignKey: "product_id", as: "images" });
db.image.belongsTo(db.product, { foreignKey: "product_id" });

// Order-Product many-to-many association
db.order.belongsToMany(db.product, { 
  through: db.orderProduct,
  foreignKey: "orderId", 
  otherKey: "productId",
  as: "products"
});

db.product.belongsToMany(db.order, { 
  through: db.orderProduct,
  foreignKey: "productId",
  otherKey: "orderId",
  as: "orders"
});

export default db;
