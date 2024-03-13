import { Sequelize, Model, DataTypes } from "sequelize";
import config from "../config/database";

const sequelize = new Sequelize(config);

class Person extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public street!: string;
  public number!: number;
  public complement!: string;
  public city!: string;
}

Person.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    street: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    complement: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    city: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "person",
    sequelize: sequelize,
  }
);

export default Person;
