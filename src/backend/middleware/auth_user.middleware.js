import jwt from 'jsonwebtoken'
import * as User from '../user/user.model';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined in environment variables');
}

export const authenticateToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if(!token){
        return res.status(401).json({ error: 'Token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.getById(decoded.id);
        if(!user || !user.is_active){
            return res.status(403).json({ error: 'User not found or inactive' });
        }

        req.user = {
            id: user.user_id,
            email: user.email,
            role:user.fk_role_id
        };

        next();

    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}