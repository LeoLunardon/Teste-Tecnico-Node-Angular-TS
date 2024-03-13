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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("./models"));
const userController_1 = __importDefault(require("./controllers/userController"));
const Users_1 = __importDefault(require("./models/Users"));
const Activity_1 = __importDefault(require("./models/Activity"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post("/users", (req, res) => {
    userController_1.default.create(req, res);
});
app.post('/createUserWithActivities', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extraia os dados do corpo da solicitação
        const { user, activities } = req.body;
        // Crie o usuário na tabela de usuários
        const createdUser = yield Users_1.default.create(user);
        // Mapeie as atividades para adicionar o ID do usuário criado
        const activitiesWithUserId = activities.map((activity) => (Object.assign(Object.assign({}, activity), { UserId: createdUser.id // Associe a atividade ao usuário recém-criado
         })));
        // Crie as atividades na tabela de atividades
        yield Activity_1.default.bulkCreate(activitiesWithUserId);
        res.status(201).json({ message: 'Usuário e atividades criados com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao criar usuário e atividades:', error);
        res.status(500).json({ error: 'Erro ao criar usuário e atividades.' });
    }
}));
app.get('/userWithActivities/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extrai o ID do usuário da URL da solicitação
        const userId = parseInt(req.params.userId, 10);
        // Busca o usuário com base no ID fornecido
        const user = yield Users_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        // Busca todas as atividades associadas a este usuário
        const activities = yield Activity_1.default.findAll({
            where: { UserId: userId }
        });
        res.json({ user, activities });
    }
    catch (error) {
        console.error('Erro ao buscar usuário e atividades:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário e atividades.' });
    }
}));
models_1.default
    .authenticate()
    .then(() => {
    console.log("Conexão estabelecida com sucesso." + models_1.default.getDatabaseName());
})
    .catch((err) => {
    console.error("Não foi possível conectar ao banco de dados:", err);
});
app.use((0, cors_1.default)());
exports.default = app;
