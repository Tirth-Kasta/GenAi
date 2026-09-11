const blacklistModel = require("../models/blacklist.model");
const userModel = require("../models/user.model");
const hash = require("../utils/hashGenretor");
const generateToken = require("../utils/tokenGenretor");
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: 0, message: "All field are required" })
        }

        const userExiest = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (userExiest) {
            return res.status(400).json({ success: 0, message: "Account already registered with this username or email" })
        }

        const hashPassword = await hash(password);

        const newUser = await userModel.create({
            username,
            email,
            password: hashPassword
        })

        if (newUser) {
            const token = await generateToken({ id: newUser._id, username: newUser.username, email: newUser.email }, "1d");
            res.cookie("token", token, {
                // maxAge: 900000,
                httpOnly: true,
                // secure: true,   
                // sameSite: 'lax' 
            });
            return res.status(201).json({ success: 1, message: "User Registered", data: { id: newUser._id, username: newUser.username, email: newUser.email } })
        }
        return res.status(500).json({ success: 0, message: "Internal Server error" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: 0, message: "Internal Server error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: 0, message: "All field are required" })
        }

        const userExiest = await userModel.findOne({ email });
        if (!userExiest) {
            return res.status(400).json({ success: 0, message: "email and password is invalide" })
        }

        const validPass = await bcrypt.compare(password, userExiest.password)

        if (!validPass) {
            return res.status(400).json({ success: 0, message: "email and password is invalide" })
        }

        const token = await generateToken({ id: userExiest._id, username: userExiest.username, email: userExiest.email }, "1d");

        res.cookie("token", token, {
            // maxAge: 900000,
            httpOnly: true,
            // secure: true,   
            // sameSite: 'lax' 
        });
        return res.status(201).json({ success: 1, message: "User Login", data: { id: userExiest._id, username: userExiest.username, email: userExiest.email } })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: 0, message: "Internal Server error" })
    }
}

const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ success: 0, message: "User is not login" })
        }
        await blacklistModel.create({ token });
        res.clearCookie('token').status(200).json({ success: 0, message: "User Logout" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: 0, message: "Internal Server error" })
    }
}


const getme = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({ success: 1, message: "User found", data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: 0, message: "Internal Server error" })
    }
}


module.exports = { register, login, logout, getme }