import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

export type UserRole = "Reader" | "Admin" | "Writer";

export interface User {
    sub: string;
    email: string;
    jti: string;
    role: UserRole[];
    exp: number;
    iss: string;
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<any>(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp && decoded.exp < currentTime) {
                    console.warn("Token expired");
                    // eslint-disable-next-line react-hooks/set-state-in-effect
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem("token");
                    return;
                }

                const normalizedUser: User = {
                    ...decoded,
                    role: Array.isArray(decoded.role)
                        ? decoded.role
                        : (decoded.role ? [decoded.role] : [])
                };

                setUser(normalizedUser);
            } catch (e) {
                console.error("Failed to decode token", e);
                setUser(null);
                setToken(null);
                localStorage.removeItem("token");
            }
        } else {
            setUser(null);
        }
    }, [token]);

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{token, user, login, logout, isLoggedIn: !!token}}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
