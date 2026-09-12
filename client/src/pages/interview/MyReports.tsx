import { useEffect } from "react";
import { Link } from "react-router";
import { useInterview } from "../../hooks/useInterview";

const MyReports = () => {
    const { reports, loading, getAllReports } = useInterview();

    useEffect(() => {
        void getAllReports();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return (
            <main className="grid min-h-[calc(100vh-72px)] place-items-center bg-[#090d12] px-4 text-center text-[#f5f7fb]">
                <div><span className="mx-auto block h-9 w-9 animate-spin rounded-full border-2 border-[#343c4c] border-t-[#f42269]" /><p className="mt-4 text-sm text-[#969ca8]">Loading your reports...</p></div>
            </main>
        );
    }

    if (reports.length === 0) {
        return (
            <main className="grid min-h-[calc(100vh-72px)] place-items-center bg-[#090d12] px-4 text-center text-[#f5f7fb]">
                <div><h1 className="text-2xl font-extrabold">No report available</h1><p className="mt-2 text-sm text-[#969ca8]">Generate an interview report to view your results.</p></div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#090d12] px-4 py-12 text-[#f5f7fb] sm:px-6 lg:py-20">
            <div className="mx-auto w-full max-w-230">
                <header className="mb-9 text-center">
                    <span className="mb-4 inline-flex rounded-full border border-[#8f2450]/60 bg-[#5a1833]/50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#ff4c85]">
                        Interview History
                    </span>
                    <h1 className="text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl lg:text-[42px]">
                        My <span className="text-[#f42269]">Reports</span>
                    </h1>
                    <p className="mx-auto mt-3 max-w-xl text-base leading-6 text-[#969ca8]">
                        Review your previously generated interview strategies.
                    </p>
                </header>

                <section className="overflow-hidden rounded-2xl border border-[#29313d] bg-[#121820] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
                    <div className="flex items-center justify-between border-b border-[#29313d] px-5 py-4 sm:px-7">
                        <div className="flex items-center gap-3">
                            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#f42269]/12 text-[#f42269]">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                    <path d="M7 3h8l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                                    <path d="M14 3v5h5M9 13h6M9 17h6" />
                                </svg>
                            </span>
                            <h2 className="text-base font-bold sm:text-lg">All Reports</h2>
                        </div>
                        <span className="rounded-full border border-[#343c4c] bg-[#202637] px-3 py-1.5 text-xs font-semibold text-[#969ca8]">
                            {reports.length} reports
                        </span>
                    </div>

                    <ul className="divide-y divide-[#29313d]">
                        {reports.map((report, index) => (
                            <li key={report._id}>
                                <Link
                                    to={`/report/${report._id}`}
                                    className="group flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-[#171e27] focus:bg-[#171e27] focus:outline-none sm:px-7"
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#343c4c] bg-[#202637] text-xs font-extrabold text-[#8e96a3] transition group-hover:border-[#f42269]/50 group-hover:bg-[#f42269]/10 group-hover:text-[#ff4c85]">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className="min-w-0 flex-1 truncate text-sm font-semibold text-[#dfe3ea] transition group-hover:text-white sm:text-base">
                                        {report.title}
                                    </span>
                                    <svg className="h-5 w-5 shrink-0 text-[#59616e] transition group-hover:translate-x-1 group-hover:text-[#f42269]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
};

export default MyReports;
