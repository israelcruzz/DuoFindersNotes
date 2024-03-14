import { Request, Response } from 'express';
import userRepository from '../repository/userRepository';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { handleError } from '../utills/handleErrors';

class SessionController {
    async create(req: Request, res: Response){
        const schema = z.object({
            email: z.string(),
            password: z.string()
        })

        const { email, password } = schema.parse(req.body);

        const user = await userRepository.findByEmail(email);

        if(!user){
            throw new handleError("E-mail ou senha incorretos", 401);
        }

        const passwordCorrect = await bcrypt.compare(password, user.password)

        if(!passwordCorrect){
            throw new handleError("E-mail ou senha incorretos", 401);
        }

        const token = jwt.sign({ id: user.id }, '@notesduofinders', {
            expiresIn: 30 * 24 * 60 * 60,
        })

        return res.status(201).json({user, token})
    }
}

export default new SessionController();