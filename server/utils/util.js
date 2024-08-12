import jwt from 'jsonwebtoken';

export const createToken = (_id) => {
    const jwtkey = 'secret123';
    return jwt.sign({ _id }, jwtkey, { expiresIn: '1d' });
}