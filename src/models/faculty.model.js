const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Faculty = sequelize.define(
  "Faculty",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FACULTY_NAME: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Faculty",
    timestamps: false,
    freezeTableName: true,
  }
);
module.exports = Faculty;
