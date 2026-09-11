const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ success: 0, message: "User is not login" })
        }

        const isTokenBlackListed = await blacklistModel.findOne({ token });
        if (isTokenBlackListed) {
            return res.status(400).json({ success: 0, message: "Your token is blacklisted" })
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).json({ success: 0, message: "Invalid token" })
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: 0, message: "Internal Server error" })
    }
}

module.exports = authUser;