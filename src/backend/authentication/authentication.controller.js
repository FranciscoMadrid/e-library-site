import * as User from '../user/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const login = async(req, res) => {
    const {email, password} = req.body;
    const ipAddress = getIp(req);
    const userAgent = req.headers['user-agent'];

    try {
        const user = await User.getByEmial(email);
        
        if(!user)
        {
            return res.status(401).json({message: 'Invalid email or password'})
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if(!isValidPassword)
        {
            return res.status(401).json({message: 'Invalid email or password'})
        }

        const userPayload = 
        {
            id: user.user_id, 
            email: user.email
        };

        const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
        const hashedRefreshToken = await hashToken(refreshToken);

        const refreshTokenExpiresIn = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000));

        const result = await UserSession.createUserSession({
            fk_user_id: user.user_id,
            session_token: hashedRefreshToken,
            user_agent: userAgent,
            ip_address: ipAddress,
            expires_at: refreshTokenExpiresIn,
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.json({accessToken});
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' }); 
    }
}

export const logout = (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });

    return res.json({ message: 'Logged out successfully' });
}

const getIp= (req) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
    return ip;
}

const hashToken = async(token) => {
    const salt_rounds = 10;

    return await bcrypt.hash(token, salt_rounds);
}