/* eslint-disable */
import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"
import type { InterviewReport } from "../interfaces/interview.interface";

type InterviewContextValue = {
    report: InterviewReport | null;
    setReport: Dispatch<SetStateAction<InterviewReport | null>>;
    reports: InterviewReport[];
    setReports: Dispatch<SetStateAction<InterviewReport[]>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

export const InterviewContext = createContext<InterviewContextValue | null>(null)

export const InterviewProvider = ({ children }: { children: ReactNode }) => {

    const [report, setReport] = useState<InterviewReport | null>(null);
    const [reports, setReports] = useState<InterviewReport[]>([]);
    const [loading, setLoading] = useState(true);


    return (
        <InterviewContext.Provider value={{ report, setReport, reports, setReports, loading, setLoading }}>
            {children}
        </InterviewContext.Provider>
    )
}
