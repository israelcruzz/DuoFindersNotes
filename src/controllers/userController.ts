import { Request, Response } from "express";
import userRepository, { User } from "../repository/userRepository";
import { handleError } from "../utills/handleErrors";
import { z } from "zod";
import bcrypt from "bcryptjs";

class UserController {
  async create(req: Request, res: Response) {
    const schema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    });

    const { name, email, password } = schema.parse(req.body);

    const userExisting = await userRepository.findByEmail(email);

    if (userExisting) {
      throw new handleError("E-mail já está em uso", 401);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.store({
      name,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      message: "Usúario Criado!",
    });
  }

  async show(req: Request, res: Response) {
    const id = req.userId;

    if (!id) {
      throw new handleError("Acesso Negado", 401);
    }

    const user = await userRepository.findById(id);

    return res.status(201).json(user);
  }

  async update(req: Request, res: Response) {
    const schemaRequestBody = z.object({
      name: z.string(),
      email: z.string(),
      currentPassword: z.string(),
      newPassword: z.string(),
    });

    const { name, email, currentPassword, newPassword } =
      schemaRequestBody.parse(req.body);

    const id = req.userId;

    const user = await userRepository.findById(id);

    if (!user) {
      throw new handleError("Acesso Negado", 401);
    }
    
    const passwordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!passwordCorrect) {
      throw new handleError("Senha digitada incorreta", 401);
    }

    const data: User = {
      email,
      name,
      password: newPassword,
      id,
    };

    const userUpdate = await userRepository.update(data);

    return res.status(201).json({
      message: "Usúario Atualizado",
      userUpdate,
    });
  }
}

export default new UserController();
