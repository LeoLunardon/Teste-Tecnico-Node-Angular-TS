// Importe os módulos necessários
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import moment from "moment-timezone";

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", {
        expiresIn: "1h",
      });
      console.log("Token válido:", token);
      const tokenCreatedAt = moment().tz("America/Sao_Paulo").format();
      return res.status(200).json({
        message: "Login realizado com sucesso",
        token,
        tokenCreatedAt,
        email: user.email,
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return res.status(500).json({ message: "Erro ao fazer login" });
    }
  }
}

export default new AuthController();
