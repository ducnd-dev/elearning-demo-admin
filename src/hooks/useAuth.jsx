import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/authApi";
import useLocalStorage from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [token, setToken] = useLocalStorage("token", null);
    const navigate = useNavigate();

    const login = async (data) => {
        const res = await api.signIn(data);
        await setToken(res.data?.data?.accessToken);
        const userData = await api.getUser(res.data?.data?.accessToken);
        setUser(userData?.data?.data);
        window.location.href = "/";
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        navigate("/auth/signin", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            token,
            login,
            logout,
            role: user?.role,
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};