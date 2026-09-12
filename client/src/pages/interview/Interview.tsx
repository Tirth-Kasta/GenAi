import { useRef, useState, type DragEvent, type FormEvent } from "react";
import { useInterview } from "../../hooks/useInterview";
import { Navigate } from "react-router";

const MAX_JOB_DESCRIPTION_LENGTH = 5000;

const Interview = () => {
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resume, setResume] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { report, handleGenerateReport } = useInterview();
    const selectResume = (file?: File) => {
        if (file) setResume(file);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        selectResume(event.dataTransfer.files[0]);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await handleGenerateReport({ jobDescription, selfDescription, resume })
    };
    if (report) {
        return <Navigate to="/report" replace />;
    }
    return (
        <main className="min-h-screen bg-[#090d12] px-4 py-12 text-[#f5f7fb] sm:px-6 lg:py-20">
            <div className="mx-auto w-full max-w-230">
                <header className="mb-9 text-center">
                    <h1 className="text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl lg:text-[42px]">
                        Create Your Custom{" "}
                        <span className="text-[#f42269]">Interview Plan</span>
                    </h1>
                    <p className="mx-auto mt-3 max-w-xl text-base leading-6 text-[#969ca8]">
                        Let our AI analyze the job requirements and your unique profile to
                        build a winning strategy.
                    </p>
                </header>

                <form
                    className="overflow-hidden rounded-2xl border border-[#29313d] bg-[#121820] shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
                    onSubmit={handleSubmit}
                >
                    <div className="grid lg:grid-cols-2">
                        <section className="border-b border-[#303844] p-6 sm:p-7 lg:border-b-0 lg:border-r">
                            <div className="mb-5 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <svg className="h-5 w-5 text-[#f42269]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                        <rect x="3" y="7" width="18" height="13" rx="2" />
                                        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M8 11v9M16 11v9" />
                                    </svg>
                                    <h2 className="text-base font-bold sm:text-lg">Target Job Description</h2>
                                </div>
                                <span className="rounded bg-[#5a1833]/75 px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] text-[#ff4c85] ring-1 ring-inset ring-[#8f2450]/60">REQUIRED</span>
                            </div>

                            <div className="relative">
                                <label className="sr-only" htmlFor="job-description">Target job description</label>
                                <textarea
                                    id="job-description"
                                    value={jobDescription}
                                    maxLength={MAX_JOB_DESCRIPTION_LENGTH}
                                    onChange={(event) => setJobDescription(event.target.value)}
                                    className="min-h-90 w-full resize-none rounded-lg border border-[#303848] bg-[#202637] px-4 py-4 text-base leading-6 text-white outline-none transition placeholder:text-[#9ca3b5] focus:border-[#f42269] focus:ring-2 focus:ring-[#f42269]/20 lg:min-h-110"
                                    placeholder={"Paste the full job description here...\ne.g. Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."}
                                    required
                                />
                                <span className="pointer-events-none absolute bottom-4 right-4 text-xs text-[#858c9b]">
                                    {jobDescription.length} / {MAX_JOB_DESCRIPTION_LENGTH} chars
                                </span>
                            </div>
                        </section>

                        <section className="p-6 sm:p-7">
                            <div className="mb-4 flex items-center gap-3">
                                <svg className="h-5 w-5 text-[#f42269]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                    <circle cx="12" cy="7" r="3" />
                                    <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
                                </svg>
                                <h2 className="text-base font-bold sm:text-lg">Your Profile</h2>
                            </div>

                            <div className="mb-3 flex items-center gap-2">
                                <label className="text-sm font-semibold" htmlFor="resume">Upload Resume</label>
                                <span className="rounded bg-[#5a1833]/75 px-2 py-1 text-[10px] font-bold tracking-[0.08em] text-[#ff4c85] ring-1 ring-inset ring-[#8f2450]/60">BEST RESULTS</span>
                            </div>

                            <input
                                ref={fileInputRef}
                                id="resume"
                                className="sr-only"
                                type="file"
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={(event) => selectResume(event.target.files?.[0])}
                            />
                            <div
                                className={`flex min-h-[132px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-5 text-center transition ${isDragging ? "border-[#f42269] bg-[#f42269]/10" : "border-[#343c4c] bg-[#202637] hover:border-[#f42269]/70"}`}
                                role="button"
                                tabIndex={0}
                                onClick={() => fileInputRef.current?.click()}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                        event.preventDefault();
                                        fileInputRef.current?.click();
                                    }
                                }}
                                onDragEnter={(event) => {
                                    event.preventDefault();
                                    setIsDragging(true);
                                }}
                                onDragOver={(event) => event.preventDefault()}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                            >
                                <svg className="mb-2 h-9 w-9 text-[#f42269]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                    <path d="M16 16l-4-4-4 4M12 12v9" />
                                    <path d="M20.4 17.5A5 5 0 0 0 18 8.2 7 7 0 0 0 4.3 10.6 4.5 4.5 0 0 0 5.5 19H7" />
                                </svg>
                                <span className="max-w-full truncate text-sm font-semibold">
                                    {resume ? resume.name : "Click to upload or drag & drop"}
                                </span>
                                <span className="mt-1 text-xs text-[#9299a9]">PDF or DOCX (Max 3MB)</span>
                            </div>

                            {/* <div className="my-4 flex items-center gap-3" aria-hidden="true">
                                <span className="h-px flex-1 bg-[#343c46]" />
                                <span className="text-xs font-medium text-[#8d94a1]">OR</span>
                                <span className="h-px flex-1 bg-[#343c46]" />
                            </div> */}

                            <label className="mb-2 block text-sm font-semibold mt-5" htmlFor="self-description">Quick Self-Description</label>
                            <textarea
                                id="self-description"
                                value={selfDescription}
                                onChange={(event) => setSelfDescription(event.target.value)}
                                className="min-h-[100px] w-full resize-none rounded-lg border border-[#b7285f] bg-[#202637] px-4 py-3 text-base leading-6 text-white outline-none transition placeholder:text-[#9ca3b5] focus:border-[#f42269] focus:ring-2 focus:ring-[#f42269]/20"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />

                            <div className="mt-3 flex gap-3 rounded-lg border border-[#344f75] bg-[#1b3054] px-4 py-3 text-sm leading-5 text-[#a7c9ff]">
                                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#5aa8ff]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 10.5v6M12 7.5h.01" stroke="#1b3054" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <p>
                                    Either a <strong className="text-white">Resume</strong> or a <strong className="text-white">Self Description</strong> is required to generate a personalized plan.
                                </p>
                            </div>
                        </section>
                    </div>

                    <footer className="flex flex-col gap-4 border-t border-[#303844] px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                        <p className="text-sm text-[#969da9]">
                            AI-Powered Strategy Generation <span className="text-[#59616e]">•</span> Approx 30s
                        </p>
                        <button
                            className="cursor-pointer inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ed2768] to-[#f00055] px-7 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(244,34,105,0.22)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#ff6a9b] focus:ring-offset-2 focus:ring-offset-[#121820] active:scale-[0.99]"
                            type="submit"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
                            </svg>
                            Generate My Interview Strategy
                        </button>
                    </footer>
                </form>

                <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-[#858c98]" aria-label="Footer">
                    <a className="transition hover:text-white" href="#privacy">Privacy Policy</a>
                    <a className="transition hover:text-white" href="#terms">Terms of Service</a>
                    <a className="transition hover:text-white" href="#help">Help Center</a>
                </nav>
            </div>
        </main>
    );
};


export default Interview