import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../loading/Loading";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const { user, loading, handleRegister } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleRegister({ username, email, password });
        navigate("/");
    }

    if (loading) {
        return (
            <Loading />
        );
    }
    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="flex min-h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_top,#243047_0%,#161616_48%)] px-4">
            <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-10">
                <div className="mb-8 text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
                        Welcome
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-white">Register</h1>
                    <p className="mt-3 text-sm text-zinc-400">
                        Enter your details to create your account.
                    </p>
                </div>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-200" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/15"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            required
                            onChange={(e) => { setUsername(e.target.value) }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-200" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/15"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            required
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-200" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/15"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>

                    <button
                        className="mt-2 w-full cursor-pointer rounded-lg bg-indigo-500 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 active:scale-[0.98]"
                        type="submit"
                    >
                        Register
                    </button>
                    <Link to="/login" className="text-sm text-center text-indigo-400 hover:text-indigo-300">
                        Already have an account? Sign in
                    </Link>
                </form>
            </section>
        </main>
    )
}

export default Register