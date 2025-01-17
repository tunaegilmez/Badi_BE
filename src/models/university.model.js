const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const University = sequelize.define(
  "University",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UNIVERSITY_NAME: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "University",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = University;
