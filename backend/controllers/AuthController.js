import User from '../models/User.js'; 
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import bcrypt from 'bcryptjs';

export const signin = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ error: "User not found" });

        if (!bcrypt.compareSync(req.body.password, user.passwordHash)) {
        return res.status(401).send({ error: "Email and password don't match." });
        }

        const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '1d' });
        res.cookie('t', token, { expire: new Date() + 9999 });
        return res.json({ token, user: { _id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        return res.status(401).json({ error: "Could not sign in" });
    }
};

export const signup = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).json({ message: "Successfully signed up!" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const signout = (req, res) => {
    res.clearCookie("t");
    return res.status(200).json({ message: "signed out" });
};
