"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Activity_1 = __importDefault(require("./Activity"));
const sequelize = new sequelize_1.Sequelize(database_1.default);
class Users extends sequelize_1.Model {
}
Users.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    street: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    number: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    complement: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: true,
    },
    city: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    tableName: "users",
    sequelize: sequelize,
});
// Definindo a associação com o modelo Activity
Users.hasMany(Activity_1.default, { foreignKey: "userId" });
exports.default = Users;
