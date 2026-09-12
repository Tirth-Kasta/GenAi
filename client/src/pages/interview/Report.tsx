import { useEffect, useState, type ReactNode } from "react";
import { useParams } from "react-router";
import { useInterview } from "../../hooks/useInterview";
import type { InterviewQuestion as Question } from "../../interfaces/interview.interface";

type SectionId = "technical" | "behavioral" | "roadmap";

const NAV_ITEMS: { id: SectionId; label: string; icon: ReactNode }[] = [
    { id: "technical", label: "Technical Questions", icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></> },
    { id: "behavioral", label: "Behavioral Questions", icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
    { id: "roadmap", label: "Road Map", icon: <polygon points="3 11 22 2 13 21 11 13 3 11" /> },
];

const QuestionCard = ({ item, index }: { item: Question; index: number }) => {
    const [open, setOpen] = useState(index === 0);
    return (
        <article className="overflow-hidden rounded-xl border border-[#29313d] bg-[#121820] transition hover:border-[#3b4553]">
            <button type="button" className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f42269]/12 text-xs font-extrabold text-[#ff4c85]">Q{index + 1}</span>
                <span className="flex-1 text-sm font-semibold leading-6 text-[#f5f7fb] sm:text-[15px]">{item.question}</span>
                <svg className={`h-4 w-4 shrink-0 text-[#858c98] transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
            {open && (
                <div className="space-y-5 border-t border-[#29313d] bg-[#0f151d] px-5 py-5 sm:px-6">
                    <div><span className="mb-2 inline-flex rounded-md border border-[#344f75] bg-[#1b3054] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#79b6ff]">Intention</span><p className="text-sm leading-6 text-[#a5acb8]">{item.intenstion}</p></div>
                    <div><span className="mb-2 inline-flex rounded-md border border-[#8f2450]/60 bg-[#5a1833]/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#ff6b9c]">Model Answer</span><p className="text-sm leading-6 text-[#c3c8d1]">{item.answer}</p></div>
                </div>
            )}
        </article>
    );
};

const Report = () => {
    const [activeSection, setActiveSection] = useState<SectionId>("technical");
    const { reportId } = useParams();
    const { report, loading, getReport } = useInterview();
    const reportData = report;

    useEffect(() => {
        if (reportId) {
            void getReport(reportId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reportId]);

    if (reportId && (loading || reportData?._id !== reportId)) {
        return (
            <main className="grid min-h-[calc(100vh-72px)] place-items-center bg-[#090d12] px-4 text-center text-[#f5f7fb]">
                <div><span className="mx-auto block h-9 w-9 animate-spin rounded-full border-2 border-[#343c4c] border-t-[#f42269]" /><p className="mt-4 text-sm text-[#969ca8]">Loading your report...</p></div>
            </main>
        );
    }

    if (!reportData) {
        return (
            <main className="grid min-h-[calc(100vh-72px)] place-items-center bg-[#090d12] px-4 text-center text-[#f5f7fb]">
                <div><h1 className="text-2xl font-extrabold">No report available</h1><p className="mt-2 text-sm text-[#969ca8]">Generate an interview report to view your results.</p></div>
            </main>
        );
    }

    const questions = activeSection === "technical" ? reportData.technoicalQuestion : reportData.behavioralQuestion;
    const score = Math.min(100, Math.max(0, reportData.matchScore));
    const scoreMessage = score >= 80 ? "Strong match for this role" : score >= 60 ? "Good match for this role" : "More preparation recommended";
    const severityClasses = {
        high: "border-[#8f2450]/60 bg-[#5a1833]/60 text-[#ff6b9c]",
        medium: "border-[#705c28] bg-[#493d1d]/60 text-[#f5c95f]",
        low: "border-[#344f75] bg-[#1b3054]/70 text-[#79b6ff]",
    };

    return (
        <main className="min-h-screen bg-[#090d12] text-[#f5f7fb]">
            <header className="border-b border-[#202833] bg-[#0d1218] px-5 py-5 sm:px-8">
                <div className="mx-auto flex max-w-360 items-center justify-between gap-4">
                    <div><p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#f42269]">AI Interview Strategy</p><h1 className="text-xl font-extrabold tracking-[-0.025em] sm:text-2xl">Your Interview Report</h1></div>
                    <span className="hidden max-w-md truncate rounded-full border border-[#29313d] bg-[#121820] px-4 py-2 text-xs font-medium text-[#969ca8] sm:inline-flex">{reportData.title}</span>
                </div>
            </header>

            <div className="mx-auto grid min-h-[calc(100vh-89px)] max-w-360 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1fr)_250px]">
                <aside className="border-b border-[#29313d] bg-[#0d1218] p-5 lg:border-b-0 lg:border-r lg:p-6">
                    <div className="flex h-full flex-col">
                        <p className="mb-3 hidden text-[11px] font-bold uppercase tracking-[0.14em] text-[#707886] lg:block">Sections</p>
                        <nav className="grid grid-cols-3 gap-2 lg:block lg:space-y-2" aria-label="Report sections">
                            {NAV_ITEMS.map((item) => (
                                <button key={item.id} type="button" onClick={() => setActiveSection(item.id)} className={`flex w-full flex-col items-center justify-center gap-2 rounded-lg px-2 py-3 text-center text-[11px] font-semibold transition sm:text-xs lg:flex-row lg:justify-start lg:px-3 lg:text-left ${activeSection === item.id ? "bg-[#f42269]/12 text-[#ff4c85] ring-1 ring-inset ring-[#f42269]/25" : "text-[#8e96a3] hover:bg-[#161d26] hover:text-white"}`}>
                                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{item.icon}</svg>{item.label}
                                </button>
                            ))}
                        </nav>
                        <button type="button" className="mt-auto hidden min-h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ed2768] to-[#f00055] px-4 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(244,34,105,0.18)] transition hover:brightness-110 lg:flex">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" /></svg>Download Resume
                        </button>
                    </div>
                </aside>

                <section className="min-w-0 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                    {activeSection !== "roadmap" ? (
                        <><div className="mb-7 flex items-end justify-between gap-4"><div><p className="mb-2 text-xs font-semibold text-[#f42269]">Personalized practice set</p><h2 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">{activeSection === "technical" ? "Technical Questions" : "Behavioral Questions"}</h2></div><span className="shrink-0 rounded-full border border-[#29313d] bg-[#121820] px-3 py-1.5 text-xs text-[#969ca8]">{questions.length} questions</span></div><div className="space-y-3">{questions.map((question, index) => <QuestionCard key={question.question} item={question} index={index} />)}</div></>
                    ) : (
                        <><div className="mb-7 flex items-end justify-between gap-4"><div><p className="mb-2 text-xs font-semibold text-[#f42269]">Focused preparation</p><h2 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">Preparation Road Map</h2></div><span className="shrink-0 rounded-full border border-[#29313d] bg-[#121820] px-3 py-1.5 text-xs text-[#969ca8]">{reportData.preparationPlan.length}-day plan</span></div>
                        <div className="relative space-y-4 before:absolute before:bottom-8 before:left-5 before:top-8 before:w-px before:bg-[#343c46]">{reportData.preparationPlan.map((day) => <article key={day.day} className="relative rounded-xl border border-[#29313d] bg-[#121820] p-5 pl-16 sm:p-6 sm:pl-18"><span className="absolute left-3 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#121820] bg-[#f42269] text-xs font-extrabold text-white sm:top-6">{day.day}</span><p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#ff4c85]">Day {day.day}</p><h3 className="mb-4 text-base font-bold sm:text-lg">{day.focus}</h3><ul className="space-y-2.5">{day.tasks.map((task, index) => <li key={`${day.day}-${index}`} className="flex gap-3 text-sm leading-5 text-[#a5acb8]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f42269]" />{task}</li>)}</ul></article>)}</div></>
                    )}
                </section>

                <aside className="border-t border-[#29313d] bg-[#0d1218] p-6 lg:col-start-2 xl:col-start-auto xl:border-l xl:border-t-0">
                    <div className="grid gap-7 sm:grid-cols-2 xl:block">
                        <section className="text-center"><p className="mb-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#707886]">Match Score</p><div className="relative mx-auto grid h-36 w-36 place-items-center rounded-full before:absolute before:inset-2 before:rounded-full before:bg-[#0d1218]" style={{ background: `conic-gradient(#f42269 0deg, #f42269 ${score * 3.6}deg, #252d38 ${score * 3.6}deg)` }}><div className="relative flex items-start"><span className="text-4xl font-extrabold tracking-[-0.05em]">{score}</span><span className="mt-1 text-sm font-bold text-[#ff4c85]">%</span></div></div><p className="mt-4 text-sm font-semibold">{scoreMessage}</p><p className="mt-1 text-xs leading-5 text-[#7f8794]">Based on your profile and the role requirements.</p></section>
                        <div className="hidden h-px bg-[#29313d] xl:my-7 xl:block" />
                        <section><p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#707886]">Skill Gaps</p><div className="flex flex-wrap gap-2">{reportData.skillGap.map((gap, index) => <span key={`${gap.skill}-${index}`} className={`rounded-md border px-3 py-2 text-xs font-semibold ${severityClasses[gap.severity]}`}>{gap.skill}</span>)}</div></section>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default Report;
