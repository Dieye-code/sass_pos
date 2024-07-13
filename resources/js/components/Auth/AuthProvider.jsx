
import axios from "axios";
import { useEffect, useState, createContext, useContext, useMemo } from "react";
import { baseApi } from "../../services/BaseService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const setNewToken = (newToken) => setToken(newToken);

    useEffect(() => {
        if (token) {
            baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
        } else {
            delete baseApi.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({ token, setNewToken }),
        [token]
    );
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
  };

  export default AuthProvider;