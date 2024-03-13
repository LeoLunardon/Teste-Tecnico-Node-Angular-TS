import cors from "cors";
import express, { Request, Response } from "express";
import sequelize from "./models";

import routes from "./API/routes/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Conexão estabelecida com sucesso." + sequelize.getDatabaseName()
    );
  })
  .catch((err) => {
    console.error("Não foi possível conectar ao banco de dados:", err);
  });

app.use(cors());

export default app;
