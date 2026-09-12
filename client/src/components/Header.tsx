import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useInterview } from "../hooks/useInterview";

const navigation = [
    { label: "Home", to: "/", end: true },
    { label: "Generate Report", to: "/interview", end: false },
    { label: "My Reports", to: "/reports", end: false },
];

const Header = () => {
    const { handleLogout, loading } = useAuth();
    const { setReport } = useInterview();

    const handleClick = (e:unknown) => {
        if (e.target.innerHTML === "Generate Report") {
            setReport(null);
        }
    }
    return (
        <header className="sticky top-0 z-50 border-b border-[#202833] bg-[#0d1218]/95 text-[#f5f7fb] shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <div className="mx-auto flex min-h-18 max-w-360 flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6 lg:px-8">
                <NavLink className="flex items-center gap-2.5" to="/" aria-label="Interview AI home">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-[#ff4c85] to-[#e00050] shadow-[0_8px_22px_rgba(244,34,105,0.25)]">
                        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
                        </svg>
                    </span>
                    <span className="text-lg font-extrabold tracking-[-0.035em]">Interview<span className="text-[#f42269]">AI</span></span>
                </NavLink>

                <nav className="order-3 flex w-full items-center justify-center gap-1 border-t border-[#202833] pt-3 sm:order-0 sm:w-auto sm:border-0 sm:pt-0" aria-label="Main navigation">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            onClick={handleClick}
                            className={({ isActive }) => `rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${isActive ? "bg-[#f42269]/12 text-[#ff4c85]" : "text-[#969ca8] hover:bg-[#171e27] hover:text-white"}`}
                        >
                            {item.label}

                        </NavLink>
                    ))}
                </nav>

                <button
                    type="button"
                    onClick={() => void handleLogout()}
                    disabled={loading}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#3a2430] bg-[#25151d] px-3.5 py-2 text-xs font-bold text-[#ff78a3] transition hover:border-[#f42269]/60 hover:bg-[#f42269]/12 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M10 17l5-5-5-5M15 12H3M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" />
                    </svg>
                    {loading ? "Logging out..." : "Logout"}
                </button>
            </div>
        </header>
    );
};

export default Header;
