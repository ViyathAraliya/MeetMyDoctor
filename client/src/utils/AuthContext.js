import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    loginDetails: null,
    login: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginDetails, setLoginDetails] = useState(null);

    const login = (data) => {
        console.log(data);
        setIsAuthenticated(true);
        setLoginDetails(data);
        localStorage.setItem("loginDetails", JSON.stringify(data));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setLoginDetails(null);
        localStorage.removeItem("loginDetails");
    };

    useEffect(() => {
        const login_Details = localStorage.getItem("loginDetails");
        if (login_Details) {
            try {
                const parsedDetails = JSON.parse(login_Details);
                setIsAuthenticated(true);
                setLoginDetails(parsedDetails);
            } catch (error) {
                console.error("Error parsing login details from localStorage", error);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginDetails, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};