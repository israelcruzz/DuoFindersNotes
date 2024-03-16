import { Request, Response } from "express";
import tagsRepository from "../repository/tagsRepository";

class TagsController {
  async index(req: Request, res: Response) {
    const userId = req.userId;

    const tags = await tagsRepository.index(userId);

    return res.status(201).json(tags);
  }
}

export default new TagsController();
