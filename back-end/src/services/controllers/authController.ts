// Importe os módulos necessários
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/User";

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      // Verifique se o usuário com o e-mail fornecido existe no banco de dados
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      // Verifique se a senha fornecida corresponde à senha armazenada no banco de dados
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      // Gere o token JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", {
        expiresIn: "1h",
      });

      return res
        .status(200)
        .json({ message: "Login realizado com sucesso", token });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return res.status(500).json({ message: "Erro ao fazer login" });
    }
  }
}

export default new AuthController();
