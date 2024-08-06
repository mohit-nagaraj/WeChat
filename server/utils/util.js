import jwt from 'jsonwebtoken';

export const createToken = (_id) => {
    const jwtkey = process.env.JWT_KEY;
    return jwt.sign({ _id }, jwtkey, { expiresIn: '1h' });
}