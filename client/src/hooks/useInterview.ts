import { useContext } from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { InterviewContext } from "../context/interview.context";
import type { GenerateReportInput } from "../interfaces/interview.interface";
import { generateReport, getReportById, getReports } from "../API/interview.api";


export const useInterview = () => {
    const context = useContext(InterviewContext);
   
    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { report, setReport, reports, setReports, loading, setLoading } = context

    const handleGenerateReport = async ({ jobDescription, selfDescription, resume }: GenerateReportInput) => {
        setLoading(true);
        try {
            const data = await generateReport({ jobDescription, selfDescription, resume });
            setReport(data.data);
            toast.success("Report Generated");
        }
        catch (error) {
            const message = isAxiosError(error)
                ? error.response?.data?.message
                : undefined;

            toast.error(message || "Unable to generate.Please try again.");
        }
        finally {
            setLoading(false);
        }
    }

    const getAllReports = async () => {
        setLoading(true);
        try {
            const data = await getReports();
            setReports(data.data);
            toast.success("All Reports Fetched");
        }
        catch (error) {
            const message = isAxiosError(error)
                ? error.response?.data?.message
                : undefined;

            toast.error(message || "Unable to fetched.Please try again.");
        }
        finally {
            setLoading(false);
        }
    }


    const getReport = async (reportId: string) => {
        setLoading(true);
        try {
            const data = await getReportById(reportId);
            setReport(data.data);
            toast.success("Report Fetched");
        }
        catch (error) {
            const message = isAxiosError(error)
                ? error.response?.data?.message
                : undefined;

            toast.error(message || "Unable to fetched.Please try again.");
        }
        finally {
            setLoading(false);
        }
    }

    return { report, reports, loading, handleGenerateReport, getAllReports, getReport,setReport }

}



