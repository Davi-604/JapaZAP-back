import jwt from 'jsonwebtoken';

export const validatePassword = (password: string) => {
    return password === process.env.SECRET_PASSWORD ? true : false;
};

export const createToken = () => {
    try {
        return jwt.sign({}, process.env.JWT_KEY as string, { expiresIn: '2d' });
    } catch (err) {
        return false;
    }
};
