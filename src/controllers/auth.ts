import { RequestHandler } from 'express';
import * as authServices from '../services/auth';
import z from 'zod';

export const login: RequestHandler = async (req, res) => {
    const loginSchema = z.object({
        password: z.string(),
    });
    const body = loginSchema.safeParse(req.body);
    console.log(req.body);

    if (body.success) {
        if (authServices.validatePassword(body.data.password)) {
            const token = authServices.createToken();
            return res.json({ token });
        }
    } else {
        return res.json({ error: 'Senha incorreta.' });
    }

    res.json({ error: 'Ocorreu um erro...' });
};
