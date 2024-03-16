import { prisma } from "../database/prismaClient";

interface Note {
  id?: string;
  title?: string;
  description?: string;
  tags?: string[];
  links?: string[];
}

type Find = {
  id: string;
  title: string;
  tags: string;
};

class NotesRepository {
  async create({ title, description, tags, links, id }: Note) {
    if (title && description && tags && links && id) {
      const note = await prisma.note.create({
        data: {
          title,
          description,
          userId: id,
        },
      });

      const linksInsert = links.map((link) => {
        return {
          url: link,
          noteId: note.id,
        };
      });

      await prisma.link.createMany({
        data: linksInsert,
      });

      const tagsInsert = tags.map((tag) => {
        return {
          name: tag,
          userId: id,
          noteId: note.id,
        };
      });

      await prisma.tag.createMany({
        data: tagsInsert,
      });
    }

    return { message: "Nota Criada" };
  }

  async findById() {}

  async findAll({ id, title, tags }: Find) {
    let notes;

    if (tags) {
      const tagsArray: string[] = tags.split(",").map((tag) => tag.trim());

      notes = await prisma.note.findMany({
        where: {
          userId: id,
          title: {
            contains: title,
          },
          tags: {
            some: {
              name: {
                in: tagsArray,
              },
            },
          },
        },
        include: {
          links: true,
          tags: true,
          user: true,
        },
      });
    } else {
      notes = await prisma.note.findMany({
        where: {
          userId: id,
          title: {
            contains: title,
          },
        },
        include: {
          links: true,
          tags: true,
          user: true,
        },
      });
    }

    return notes;
  }

  async delete() {}
}

export default new NotesRepository();
