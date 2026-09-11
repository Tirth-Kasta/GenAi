/* eslint-disable */
import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"

type AuthContextValue = {
    user: unknown | null;
    setUser: Dispatch<SetStateAction<unknown | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<unknown | null>(null);
    const [loading, setLoading] = useState(true);


    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
