'use client'
import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { User } from "@/types/user";

type AuthContextType = {
    isLoggedIn: boolean;
    isLoading: boolean;
    user: User | null;
    logOutUser: () => void;
    storeToken: (token: string) => void;
    authenticateUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    isLoading: false,
    user: null,
    logOutUser: () => { },
    storeToken: (token: string) => { },
    authenticateUser: () => { },
});


function AuthProvider({ children, apiUrl }: any) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const storeToken = (token: string) => {
        localStorage.setItem("authToken", token);
    };

    const authenticateUser = () => {
        // Get the stored token from the localStorage
        const storedToken = localStorage.getItem("authToken");
        // If the token exists in the localStorage
        if (storedToken) {
            // We must send the JWT token in the request's "Authorization" Headers
            axios
                .get(`${apiUrl}/auth/verify`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then((response) => {
                    // If the server verifies that JWT token is valid  ✅
                    const user = response.data;
                    // Update state variables
                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(user);
                })
                .catch((error) => {
                    // If the server sends an error response (invalid token) ❌
                    // Update state variables
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null);
                });
        } else {
            // If the token is not available
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    };

    const removeToken = () => {
        // Upon logout, remove the token from the localStorage
        localStorage.removeItem("authToken");
    };

    const logOutUser = () => {
        removeToken();
        authenticateUser();
    };

    useEffect(() => {
        // Get the stored token from the localStorage
        const storedToken = localStorage.getItem("authToken");
        // If the token exists in the localStorage
        if (storedToken) {
            // We must send the JWT token in the request's "Authorization" Headers
            axios
                .get(`${apiUrl}/auth/verify`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then((response) => {
                    // If the server verifies that JWT token is valid  ✅
                    const user = response.data;
                    // Update state variables
                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(user);
                })
                .catch((error) => {
                    // If the server sends an error response (invalid token) ❌
                    // Update state variables
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null);
                });
        } else {
            // If the token is not available
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }

    }, [apiUrl]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                user,
                storeToken,
                authenticateUser,
                logOutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };
