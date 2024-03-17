import Person from "../../models/Person";
import { Response, Request } from "express";
import Activity from "../../models/Actitivy";

class PersonController {
  async create(req: Request, res: Response) {
    const { name, email, street, number, complement, city } = req.body;
    try {
      const person = await Person.create({
        name,
        email,
        street,
        number,
        complement,
        city,
      });
      return res.status(201).json(person);
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Erro ao criar usuário" + "" + err });
    }
  }

  async addActivitiesToPerson(req: Request, res: Response) {
    const userId = req.params.id;
    const { activities } = req.body;

    try {
      const user = await Person.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const activitiesWithUserId = activities.map((activity: any) => {
        return { ...activity, UserId: userId };
      });

      const newActivities = await Activity.bulkCreate(activitiesWithUserId);

      res.status(201).json(newActivities);
    } catch (error) {
      console.error("Erro ao adicionar atividades ao usuário:", error);
      res
        .status(500)
        .json({ error: "Erro ao adicionar atividades ao usuário" });
    }
  }

  async deleteActivity(req: Request, res: Response) {
    const activityId = req.params.activityId;

    try {
      const activity = await Activity.findByPk(activityId);
      if (!activity) {
        return res.status(404).json({ error: "Atividade não encontrada" });
      }
      await activity.destroy();
      res.status(200).json({ message: "Atividade deletada com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar atividade:", error);
      res.status(500).json({ error: "Erro ao deletar atividade" });
    }
  }

  async personWithActivities(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await Person.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const activities = await Activity.findAll({ where: { UserId: userId } });

      res.json({ user, activities });
    } catch (error) {
      console.error("Erro ao buscar usuário e atividades:", error);
      res.status(500).json({ error: "Erro ao buscar usuário e atividades" });
    }
  }

  async getAllPersons(req: Request, res: Response) {
    try {
      const persons = await Person.findAll({ attributes: ["id", "name"] });

      res.json(persons);
    } catch (error) {
      console.error("Erro ao recuperar pessoas:", error);
      res.status(500).json({ error: "Erro ao recuperar pessoas" });
    }
  }
}

export default new PersonController();
