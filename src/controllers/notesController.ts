import { z } from "zod";
import notesRepository from "../repository/notesRepository";
import { Request, Response } from "express";

interface NotesQuery {
  title: string;
  tags: string;
}

class NotesController {
  async index(req: Request, res: Response) {
    const { title, tags } = req.query as unknown as NotesQuery;

    const id = req.userId;

    const notes = await notesRepository.findAll({ id, title, tags });

    return res.status(201).json(notes);
  }

  async store(req: Request, res: Response) {
    const schema = z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      links: z.array(z.string()),
    });

    const id = req.userId;

    const { title, description, tags, links } = schema.parse(req.body);

    const note = await notesRepository.create({
      title,
      description,
      tags,
      links,
      id,
    });

    return res.status(201).json(note.message);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;

    const note = await notesRepository.findById({ userId, id });

    return res.status(201).json(note);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;

    const note = await notesRepository.delete({ userId, id });

    return res.status(201).json(note);
  }
}

export default new NotesController();
