const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

const prueba = path.join(__dirname, "../models");
console.log(prueba);

fs.readdirSync(path.join(__dirname, "../models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "../models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
// sequelize.models.map(item => console.log(item.toString()))

const { Product, Category, Image, User, Order, Review } = sequelize.models;

// Relación muchos a muchos entre Product y Category, CategoryProduct como tabla intermedia:
// Un producto puede tener muchas categorías y una categoría puede tener muchos productos.
const CategoryProduct = sequelize.define(
  "category_product",
  {},
  {
    timestamps: false,
  }
);

Product.belongsToMany(Category, {
  as: "category",
  foreignKey: "productId",
  otherKey: "categoryId",
  through: CategoryProduct,
  timestamps: false,
});
Category.belongsToMany(Product, {
  as: "product",
  foreignKey: "categoryId",
  otherKey: "productId",
  through: CategoryProduct,
  timestamps: false,
});

// Relación uno a muchos entre Product e Image:
// Un producto tiene muchas imágenes y muchas imágenes pueden ser de un producto.
Product.hasMany(Image, { foreignKey: "prodId" });
Image.belongsTo(Product, { as: "product", foreignKey: "prodId" });

console.log("--------------------------------");

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  CategoryProduct,
  // OrderLine,
};
