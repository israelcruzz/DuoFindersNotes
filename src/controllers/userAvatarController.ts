import { Request, Response } from "express";
import userRepository from "../repository/userRepository";
import { handleError } from "../utills/handleErrors";
import { prisma } from "../database/prismaClient";

class UserAvatarController {
  async update(req: Request, res: Response) {
    const userId = req.userId;
    const avatarFilename = req.file?.filename;

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new handleError(
        "Somente usuários autenticados podem mudar o avatar",
        401
      );
    }

    const userAvatarUpdate = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            avatar: avatarFilename
        }
    })

    return res.status(201).json(userAvatarUpdate)
  }
}

export default new UserAvatarController();
