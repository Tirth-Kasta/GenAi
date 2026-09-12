import type { GenerateReportInput } from "../interfaces/interview.interface";
import api from "./api.config";




export const generateReport = async ({ jobDescription, selfDescription, resume }: GenerateReportInput) => {
    try {
        const formData = new FormData();
        formData.append("jobDescription", jobDescription);
        formData.append("selfDescription", selfDescription);
        if (resume) {
            formData.append("resume", resume);
        }

        const response = await api.post("/api/interview/generate", formData, {
            headers: {
                "Content-Length": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const getReportById = async (reportId: string) => {
    try {
        const response = await api.get(`/api/interview/report/${reportId}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const getReports = async () => {
    try {
        const response = await api.get("/api/interview/reports");
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
