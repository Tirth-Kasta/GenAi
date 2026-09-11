const express = require("express");

const authUser = require("../middlewares/auth.middleware");
const upload = require("../middlewares/file.middleware");
const { generateInterviewReportController } = require("../controllers/interview.controller");
const interviewRouter = express.Router();


interviewRouter.post("/generate", authUser, upload.single("resume"), generateInterviewReportController)

module.exports = interviewRouter