const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Sequelize bağlantınız

const Categories = sequelize.define("Categories", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Categories",
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

Categories.hasMany(Categories, {
  foreignKey: "parent_id",
  as: "subcategories",
});
Categories.belongsTo(Categories, { foreignKey: "parent_id", as: "parent" });

module.exports = Categories;
