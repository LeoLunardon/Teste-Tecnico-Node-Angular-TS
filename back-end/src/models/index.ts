import { Sequelize } from "sequelize";
import config from "../config/database";
import Person from "./Person";
import Activity from "./Actitivy";
import User from "./User";

const sequelize = new Sequelize(config);

(async () => {
  const models = [Person, Activity, User];

  for (const model of models) {
    await model.sync();
  }

  console.log("Modelos sincronizados:");
  for (const model of models) {
    console.log(model.name);
  }
})();

export default sequelize;
