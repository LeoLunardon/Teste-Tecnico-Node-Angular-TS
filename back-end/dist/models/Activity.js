"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Users_1 = __importDefault(require("./Users"));
const sequelize = new sequelize_1.Sequelize(database_1.default);
class Activity extends sequelize_1.Model {
}
Activity.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    descricao: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    dataInicio: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    dataFim: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    dataCriacao: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Users_1.default, // Referenciando a tabela Users
            key: 'id' // Referenciando a chave primária da tabela Users
        }
    }
}, {
    tableName: "activities",
    sequelize: sequelize,
});
exports.default = Activity;
