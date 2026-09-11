const express = require("express");
const { register, login, logout, getme } = require("../controllers/auth.controllers");
const authUser = require("../middlewares/auth.middleware");
const authRouter = express.Router();


authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.get("/me", authUser, getme)


module.exports = authRouter