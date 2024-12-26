import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { Navigate } from 'react-router-dom';

export default function PrivateRoutes({ children }) {

    const { user, loading } = useContext(AuthContext);


    if(loading) {
        return <div>Loading...</div>
    }

    if(!user) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            {children}
        </div>
    )
}
