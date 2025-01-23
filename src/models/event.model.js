const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("../models/user.model");

const Event = sequelize.define("Event", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  locationTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Event, { foreignKey: "createdBy" });
Event.belongsTo(User, { foreignKey: "createdBy" });

module.exports = Event;
