import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const authPrivate: RequestHandler = (req, res, next) => {
    if (req.headers.authorization) {
        const [tokenType, token] = req.headers.authorization?.split(' ');

        if (tokenType.toLowerCase() === 'bearer') {
            try {
                jwt.verify(token, process.env.JWT_KEY as string);

                return next();
            } catch (err) {}
        }
    }

    res.status(403).json({ error: 'Não autorizado' });
};
