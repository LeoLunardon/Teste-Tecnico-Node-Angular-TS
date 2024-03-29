"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../models/Users"));
class UsersController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, street, number, complement, city } = req.body;
            try {
                const user = yield Users_1.default.create({ name, email, street, number, complement, city });
                return res.json(user);
            }
            catch (err) {
                return res.status(400).json({ error: 'Registration failed' });
            }
        });
    }
}
exports.default = new UsersController();
