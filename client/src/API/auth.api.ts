import api from "./api.config";
import type { User } from "../interfaces/auth.interface";






export const register = async (userData: User) => {
    try {
        const response = await api.post("/api/auth/register", userData);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const login = async (userData: User) => {
    const response = await api.post("/api/auth/login", userData);
    return response.data;
}

export const logout = async () => {
    try {
        const response = await api.post("/api/auth/logout");
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const getMe = async () => {
    try {
        const response = await api.post("/api/auth/me");
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
