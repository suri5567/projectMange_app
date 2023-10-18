import express from 'express';
import { AuthModel } from '../model/userAuth.js'
import cookieParser from 'cookie-parser';
import { setUserCookie } from '../utility.js'

const app = express();
app.use(cookieParser());


export const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ msg: "Bad Request: Email and password are required." });
        }

        const normalizedEmail = email.toLowerCase();
        const userData = await AuthModel.findOne({ email: normalizedEmail });

        if (!userData) {
            return res.status(403).json({ msg: "Forbidden: User not found." });
        }

        if (userData.password !== password) {
            return res.status(403).json({ msg: "Forbidden: Invalid password." });
        }

        const token = setUserCookie(userData);
        res.cookie('uid', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: false
        });

        res.status(201).json({ msg: 'Success: Login successful.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};