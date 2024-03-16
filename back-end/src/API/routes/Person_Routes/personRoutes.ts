import express from "express";
import personController from "../../../services/controllers/personController";
import { jwtAuth } from "../../../services/middlewares/jwtAuth";

const personRouter = express.Router();

//Cadastrar pessoas e atividades
personRouter.post(
  "/createPersonActivities",
  jwtAuth,
  personController.createPersonActivities
);
personRouter.post(
  "/create",
  jwtAuth,
  personController.create
);

//Adicionar novas atividades a pessoas
personRouter.post(
  "/:id/addActivitiesToPerson",
  jwtAuth,
  personController.addActivitiesToPerson
);

//Buscar pessoas e suas atividades
personRouter.get(
  "/personWithActivities/:id",
  jwtAuth,
  personController.personWithActivities
);

personRouter.get(
  "/getAllPersons",
  jwtAuth,
  personController.getAllPersons
);

export default personRouter;
