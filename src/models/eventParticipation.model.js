const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");
const Event = require("./event.model");

const EventParticipation = sequelize.define("EventParticipation", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Event,
      key: "id",
    },
  },
  status: {
    type: DataTypes.ENUM("pending", "accepted", "rejected"),
    defaultValue: "pending",
    allowNull: false,
  },
});

User.belongsToMany(Event, {
  through: EventParticipation,
  foreignKey: "userId",
});
Event.belongsToMany(User, {
  through: EventParticipation,
  foreignKey: "eventId",
});

module.exports = EventParticipation;
