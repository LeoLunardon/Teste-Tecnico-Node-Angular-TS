"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Users_1 = __importDefault(require("./Users"));
const sequelize = new sequelize_1.Sequelize(database_1.default);
const models = [Users_1.default];
models.forEach((model) => model
    .sync()
    .then(() => console.log(`Modelo ${model.name} sincronizado com sucesso!`)));
exports.default = sequelize;
