const pdfParse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

const generateInterviewReportController = async (req, res) => {
    const resumeFile = req.file;
    const { selfDescription, jobDescription } = req.body;

    if (!resumeFile?.buffer?.length) {
        return res.status(400).json({
            success: 0,
            message: "Please upload a non-empty PDF resume"
        });
    }

    if (resumeFile.mimetype !== "application/pdf") {
        return res.status(400).json({
            success: 0,
            message: "Resume must be a PDF file"
        });
    }

    if (!selfDescription || !jobDescription) {
        return res.status(400).json({
            success: 0,
            message: "Self description and job description are required"
        });
    }

    const parser = new pdfParse.PDFParse({
        data: new Uint8Array(resumeFile.buffer)
    });

    let resumeContent;
    try {
        resumeContent = await parser.getText();
    } catch {
        return res.status(400).json({
            success: 0,
            message: "The uploaded PDF is empty or invalid"
        });
    } finally {
        await parser.destroy();
    }

    if (!resumeContent.text.trim()) {
        return res.status(400).json({
            success: 0,
            message: "The uploaded PDF does not contain readable text"
        });
    }

    const interviewReportResponce = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportResponce
    })

    return res.status(201).json({ success: 1, message: "Interview Report Generated", data: interviewReport })
}


module.exports = { generateInterviewReportController }
