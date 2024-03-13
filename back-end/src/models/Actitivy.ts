import { Sequelize, Model, DataTypes } from "sequelize";
import config from "../config/database";
import Person from "./Person";

const sequelize = new Sequelize(config);

const Activity = sequelize.define("activities", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
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
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  creationDate: {
    type: DataTypes.DATE,
  },
});
Activity.belongsTo(Person, { foreignKey: "UserId" });
export default Activity;
