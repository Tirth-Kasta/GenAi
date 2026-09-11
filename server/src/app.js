const express = require("express");
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const interviewRouter = require("./routes/interview.route");









//JSON Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))




//API Test 
app.get("/api/halth", (req, res) => {
    res.status(200).json({ success: 1, message: "API is working" })
})




//Other APIs
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)


module.exports = app;