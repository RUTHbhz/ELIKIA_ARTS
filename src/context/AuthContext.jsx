import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved user in localStorage on mount
        const savedUser = localStorage.getItem('elikia_user');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login - in a real app, this would hit an API
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    const user = {
                        id: 'user-123',
                        name: email.split('@')[0],
                        email: email,
                        avatar: null
                    };
                    setCurrentUser(user);
                    localStorage.setItem('elikia_user', JSON.stringify(user));
                    resolve(user);
                } else {
                    reject(new Error("Email et mot de passe requis"));
                }
            }, 1000);
        });
    };

    const signup = (name, email, password) => {
        // Mock signup
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name && email && password) {
                    const user = {
                        id: 'user-' + Date.now(),
                        name: name,
                        email: email,
                        avatar: null
                    };
                    setCurrentUser(user);
                    localStorage.setItem('elikia_user', JSON.stringify(user));
                    resolve(user);
                } else {
                    reject(new Error("Tous les champs sont requis"));
                }
            }, 1000);
        });
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('elikia_user');
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
