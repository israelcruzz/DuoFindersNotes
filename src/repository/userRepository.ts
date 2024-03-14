import { prisma } from '../database/prismaClient';

export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
};

class UserRepository {
    async store({ name, email, password }: User){
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            }
        })

        return user.id
    }

    async findByEmail(email: string){
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        return user
    }

    async findById(id: string){
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
    }

    async update(data: User){
        const userUpdate = await prisma.user.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                updatedAt: new Date() 
            }
        })

        return userUpdate
    }
}

export default new UserRepository();