import express, { Router } from "express";
import userController from "../../../services/controllers/userController";

const userRouter = express.Router();

//Cadastrar novo usuário
userRouter.post("/createUser", userController.createUser);

export default userRouter;
