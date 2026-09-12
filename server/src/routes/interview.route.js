const express = require("express");

const authUser = require("../middlewares/auth.middleware");
const upload = require("../middlewares/file.middleware");
const { generateInterviewReportController, getReport, getAllReport } = require("../controllers/interview.controller");
const interviewRouter = express.Router();


interviewRouter.post("/generate", authUser, upload.single("resume"), generateInterviewReportController)
interviewRouter.get("/report/:interviewId", authUser, getReport)
interviewRouter.get("/reports", authUser, getAllReport)

module.exports = interviewRouter