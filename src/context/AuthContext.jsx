import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Auth: Initializing listener...");
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    console.log("Auth: Fetching user profile for:", user.email);
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        console.log("Auth: Profile found, role:", userData.role);
                        setCurrentUser({ ...user, ...userData });
                    } else {
                        console.warn("Auth: No user profile found in Firestore");
                        setCurrentUser(user);
                    }
                } catch (error) {
                    console.error("Auth: Error fetching user profile:", error);
                    setCurrentUser(user);
                }
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        // Safety timeout: if auth doesn't respond in 5s, stop loading to show the site
        const timeout = setTimeout(() => {
            if (loading) {
                console.warn("Auth: Initialization timed out, forcing loading end.");
                setLoading(false);
            }
        }, 5000);

        return () => {
            unsubscribe();
            clearTimeout(timeout);
        };
    }, []);

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (name, email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Mettre à jour le profil avec le nom
        await updateProfile(userCredential.user, {
            displayName: name
        });
        // Force refresh user to get displayName
        setCurrentUser({ ...userCredential.user, displayName: name });
        return userCredential;
    };

    const logout = () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
