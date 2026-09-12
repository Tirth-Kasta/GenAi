const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = z.object({

    matchScore: z.number().min(0).max(100).describe("The match score between 0 and 100 indicating how well the candidate matches the job description"),


    technoicalQuestion: z.array(z.object({
        question: z.string().describe("The technical question asked during the interview"),
        intenstion: z.string().describe("The intention behind the question"),
        answer: z.string().describe("The answer provided by the candidate")
    })).describe("An array of technical questions asked during the interview"),


    behavioralQuestion: z.array(z.object({
        question: z.string().describe("The behavioral question asked during the interview"),
        intenstion: z.string().describe("The intention behind the question"),
        answer: z.string().describe("The answer provided by the candidate")
    })).describe("An array of behavioral questions asked during the interview"),


    skillGap: z.array(z.object({
        skill: z.string().describe("The skill gap identified during the interview"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap"),
    })).describe("An array of skill gaps identified during the interview"),


    preparationPlan: z.array(z.object({
        day: z.number().describe("The day of the preparation plan"),
        focus: z.string().describe("The main preparation focus for this day"),
        tasks: z.array(z.string()).describe("The preparation tasks to complete on this day")
    })).describe("An array of preparation plans for the candidate to improve their skills"),

    title:z.string().describe("The title of the interview report"),
});

const interviewReportJsonSchema = z.toJSONSchema(interviewReportSchema);

const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {

    const prompt = `You are an AI assistant that generates an interview report based on the candidate's resume, self-description, and job description. The report should include a match score, technical questions, behavioral questions, skill gaps, and a preparation plan. Please provide the output in JSON format according to the following schema: ${JSON.stringify(interviewReportJsonSchema)}. The resume is: ${resume}. The self-description is: ${selfDescription}. The job description is: ${jobDescription}.`;


    const responce = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: interviewReportJsonSchema,
        }
    })

    const parsedResponse = JSON.parse(responce.text);
    return interviewReportSchema.parse(parsedResponse);
}


module.exports = { generateInterviewReport }
