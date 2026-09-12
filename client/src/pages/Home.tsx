import { Link } from "react-router";

const Home = () => {
    return (
        <main className="min-h-[calc(100vh-72px)] overflow-hidden bg-[#090d12] text-[#f5f7fb]">
            <section className="relative px-4 pb-20 pt-18 sm:px-6 sm:pt-24 lg:pb-28 lg:pt-28">
                <div className="pointer-events-none absolute left-1/2 top-10 h-100 w-100 -translate-x-1/2 rounded-full bg-[#f42269]/10 blur-[120px]" aria-hidden="true" />
                <div className="relative mx-auto max-w-280 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#8f2450]/50 bg-[#5a1833]/40 px-4 py-2 text-xs font-bold tracking-[0.08em] text-[#ff6b9c]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#f42269] shadow-[0_0_10px_#f42269]" />
                        AI-POWERED INTERVIEW PREPARATION
                    </span>
                    <h1 className="mx-auto mt-7 max-w-230 text-4xl font-extrabold leading-[1.08] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                        Turn every interview into your <span className="bg-gradient-to-r from-[#ff4c85] to-[#f42269] bg-clip-text text-transparent">best opportunity.</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-175 text-base leading-7 text-[#969ca8] sm:text-lg">
                        Get a personalized interview strategy built around your experience and the role you want—from targeted questions to a focused preparation roadmap.
                    </p>
                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link to="/interview" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ed2768] to-[#f00055] px-7 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(244,34,105,0.25)] transition hover:-translate-y-0.5 hover:brightness-110 sm:w-auto">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" /></svg>
                            Generate My Report
                        </Link>
                        <Link to="/reports" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#343c4c] bg-[#121820] px-7 py-3 text-sm font-bold text-[#dfe3ea] transition hover:-translate-y-0.5 hover:border-[#f42269]/60 hover:text-white sm:w-auto">
                            View My Reports
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-y border-[#202833] bg-[#0d1218] px-4 py-18 sm:px-6 lg:py-22">
                <div className="mx-auto max-w-280">
                    <div className="mx-auto mb-11 max-w-160 text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f42269]">Everything you need</p>
                        <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">Prepare with a clear advantage</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {[
                            { title: "Role-Specific Questions", copy: "Practice technical and behavioral questions tailored to the exact role you are targeting.", icon: <path d="M8 9h8M8 13h5M5 21l2.5-4H19a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2.5" /> },
                            { title: "Match Insights", copy: "See how your profile aligns with the role and identify the skills that deserve extra attention.", icon: <><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.2 2.2 4.8-5" /></> },
                            { title: "Focused Roadmap", copy: "Follow a practical day-by-day plan that turns preparation into manageable, focused steps.", icon: <><path d="M4 19V5M4 6h11l-2 3 2 3H4" /><path d="M8 19h11" /></> },
                        ].map((feature) => (
                            <article key={feature.title} className="group rounded-2xl border border-[#29313d] bg-[#121820] p-6 transition hover:-translate-y-1 hover:border-[#f42269]/40 hover:shadow-[0_18px_45px_rgba(0,0,0,0.25)] sm:p-7">
                                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-[#f42269]/10 text-[#f42269] ring-1 ring-inset ring-[#f42269]/20 transition group-hover:bg-[#f42269] group-hover:text-white">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{feature.icon}</svg>
                                </span>
                                <h3 className="text-lg font-bold">{feature.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-[#969ca8]">{feature.copy}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-4 py-20 sm:px-6 lg:py-24">
                <div className="mx-auto flex max-w-230 flex-col items-center justify-between gap-7 overflow-hidden rounded-2xl border border-[#8f2450]/40 bg-[linear-gradient(120deg,#27131d,#121820_62%)] px-6 py-10 text-center shadow-[0_24px_70px_rgba(0,0,0,0.25)] sm:px-10 lg:flex-row lg:text-left">
                    <div><h2 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">Ready to build your interview strategy?</h2><p className="mt-2 text-sm leading-6 text-[#a5acb8]">Create your personalized report and start preparing with purpose.</p></div>
                    <Link to="/interview" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-[#f42269] px-7 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(244,34,105,0.24)] transition hover:brightness-110">Get Started</Link>
                </div>
            </section>
        </main>
    );
};

export default Home
