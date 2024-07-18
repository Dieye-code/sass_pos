
import axios from "axios";
import { useEffect, useState, createContext, useContext, useMemo } from "react";
import { baseApi } from "../../services/BaseService";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState('');

    const setNewToken = (newToken) => setToken(newToken);
    const setNewRole = (newRole) => setRole(newRole);

    useEffect(() => {
        if (token) {
            baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            if(token != undefined && token != '' && token != null){
                const decoded = jwtDecode(token);
                setRole(decoded.role);
            }
        } else {
            delete baseApi.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            setRole('');
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({ token, setNewToken, role, setNewRole }),
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