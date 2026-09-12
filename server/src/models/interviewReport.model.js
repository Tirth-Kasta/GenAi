const mongoose = require("mongoose");




const technoicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is require"]
    },
    intenstion: {
        type: String,
        required: [true, "Intenstion is require"]
    },
    answer: {
        type: String,
        required: [true, "Answer is require"]
    },
}, {
    _id: false
})


const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is require"]
    },
    intenstion: {
        type: String,
        required: [true, "Intenstion is require"]
    },
    answer: {
        type: String,
        required: [true, "Answer is require"]
    },
}, {
    _id: false
})


const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is require"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is require"]
    }
}, {
    _id: false
})


const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is require"]
    },
    focus: {
        type: String,
        required: [true, "Focus is require"]
    },
    tasks: [{
        type: String,
        required: [true, "Task is require"]
    }]
}, {
    _id: false
})




const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job Description is required"]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technoicalQuestion: [technoicalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title:{
        type:String,
        required: [true, "Title is require"]
    }
}, {
    timestamps: true
})

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema)

module.exports = interviewReportModel
