import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { register, login, logout, getMe } from "../API/auth.api"
import type { User } from "../interfaces/auth.interface";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";


export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }: User) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.data);
            toast.success("Logged in successfully");
        }
        catch (error) {
            const message = isAxiosError(error)
                ? error.response?.data?.message
                : undefined;

            toast.error(message || "Unable to log in. Please try again.");
        }
        finally {
            setLoading(false);
        }

    }

    const handleRegister = async ({ username, email, password }: User) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            setUser(data.data);
            toast.success("Registered in successfully");
        }
        catch (error) {
            const message = isAxiosError(error)
                ? error.response?.data?.message
                : undefined;

            toast.error(message || "Unable to register. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
            toast.success("Logged out successfully");
        }
        catch (error) {
            const message = isAxiosError(error)
                ? error.response?.data?.message
                : undefined;

            toast.error(message || "Unable to log in. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await getMe();
                setUser(data.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        void getUser()
    }, [setUser, setLoading])

    return { user, loading, handleLogin, handleRegister, handleLogout }

}



