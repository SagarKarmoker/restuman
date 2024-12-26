import React, { createContext, useEffect, useState } from 'react'
import auth from '../config/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, updatePassword, sendPasswordResetEmail } from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const provider = new GoogleAuthProvider();

    const createUser = async (email, password) => {
        setLoading(true)
        try {
            return createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const login = async (email, password) => {
        setLoading(true)
        try {
            return signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        setLoading(true)
        try {
            return signOut(auth)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const signInWithGoogle = async () => {
        setLoading(true)
        try {
            return signInWithPopup(auth, provider)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const updateUserProfile = async (name, photoUrl) => {
        setLoading(true)
        try {
            return updateProfile(auth.currentUser, { displayName: name, photoURL: photoUrl })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const updateUserPassword = async (password) => {
        setLoading(true)
        try {
            return updatePassword(auth.currentUser, password)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const sendResetEmail = async (email) => {
        setLoading(true)
        try {
            return sendPasswordResetEmail(auth, email)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const authInfo = {
        user,
        createUser,
        login,
        logout,
        signInWithGoogle,
        loading,
        updateUserProfile,
        updateUserPassword,
        sendResetEmail
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if(currentUser?.email){
                const user = {
                    email: currentUser.email
                }

                const response = axios.post('http://localhost:5000/api/v1/auth', user, {
                    withCredentials: true
                })

                console.log(response.data)
                setLoading(false);
            } else{
                const response = axios.post('http://localhost:5000/api/v1/logout', { }, {
                    withCredentials: true
                })
                console.log(response.data)
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [])

    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider>
    )
}
