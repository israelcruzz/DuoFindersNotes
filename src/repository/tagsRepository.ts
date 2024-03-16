import { prisma } from '../database/prismaClient';

class TagsRepository {
    async index(id: string){
        const tags = await prisma.tag.findMany({
            where: {
                userId: id
            },
            include: {
                Note: true
            }
        })

        return tags
    }
}

export default new TagsRepository();
