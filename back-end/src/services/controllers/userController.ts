// Importe as bibliotecas necessárias
import bcrypt from "bcrypt";
import User from "../../models/User";
import { Response, Request } from "express";

class UserController {
  async createUser(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        password: hashedPassword, // Use o hash da senha
      });

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: "Registration failed" + " " + err });
    }
  }
}

export default new UserController();
