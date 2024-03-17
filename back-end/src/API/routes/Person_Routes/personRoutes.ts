import express from "express";
import personController from "../../../services/controllers/personController";
import { jwtAuth } from "../../../services/middlewares/jwtAuth";

const personRouter = express.Router();
//Cadastrar pessoas
personRouter.post("/create", jwtAuth, personController.create);


//Adicionar novas atividades a pessoas
personRouter.post(
  "/:id/addActivitiesToPerson",
  jwtAuth,
  personController.addActivitiesToPerson
);

personRouter.delete(
  "/:activityId/deleteActivity",
  jwtAuth,
  personController.deleteActivity
)

//Buscar pessoas e suas atividades
personRouter.get(
  "/personWithActivities/:id",
  jwtAuth,
  personController.personWithActivities
);

personRouter.get("/getAllPersons", jwtAuth, personController.getAllPersons);

export default personRouter;
