import express from "express";
import personRouter from "./Person_Routes/personRoutes";
import userRouter from "./User_Routes/userRoutes";
import authRouter from "./Auth_Routes/authRoutes";

const routes = express.Router();

routes.use(userRouter);
routes.use(personRouter);
routes.use(authRouter);

export default routes;
