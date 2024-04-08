import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) return res.status(401).json({ error: "Token is required for authentication" });

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = { _id: decoded._id }; 
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};

export default authenticateToken;
