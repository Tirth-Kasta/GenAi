export interface GenerateReportInput {
    jobDescription: string;
    selfDescription: string;
    resume: File | null;
}

export interface InterviewQuestion {
    question: string;
    intenstion: string;
    answer: string;
}

export interface SkillGap {
    skill: string;
    severity: "low" | "medium" | "high";
}

export interface PreparationDay {
    day: number;
    focus: string;
    tasks: string[];
}

export interface InterviewReport {
    _id: string;
    title: string;
    matchScore: number;
    technoicalQuestion: InterviewQuestion[];
    behavioralQuestion: InterviewQuestion[];
    skillGap: SkillGap[];
    preparationPlan: PreparationDay[];
    createdAt?: string;
    updatedAt?: string;
}
