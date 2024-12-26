import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import Swal from 'sweetalert2';

export default function Login() {
    const { user, login, signInWithGoogle } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    if (user) {
        return <Navigate to="/dashboard" />; 
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!e.target.email.value || !e.target.password.value) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true); 

        try {
            await login(e.target.email.value, e.target.password.value);
            Swal.fire('Login Successful', 'You have successfully logged in.', 'success');
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            setError(error.message); 
            Swal.fire('Login Failed', error.message, 'error');
        } finally {
            setLoading(false); 
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            Swal.fire('Login Successful', 'You have successfully logged in with Google.', 'success');
            navigate('/dashboard'); 
        } catch (error) {
            console.log(error);
            setError(error.message);
            Swal.fire('Login Failed', error.message, 'error');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200 px-5">
            <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center">Login</h2>

                {/* Login Form */}
                <form onSubmit={handleLogin}>
                    {/* Email Field */}
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Google Login Button */}
                    <div className="flex justify-center mb-4">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="btn btn-outline w-full"
                        >
                            Login with Google
                        </button>
                    </div>

                    {/* Login Button */}
                    <div className="flex justify-center mb-4">
                        <button type="submit" className="btn btn-primary w-full">
                            {loading ? 'Checking...' : 'Login'}
                        </button>
                    </div>
                </form>

                {/* Display Error Message */}
                {error && (
                    <div className="text-center text-red-500 text-sm mb-4">
                        {error}
                    </div>
                )}

                {/* Link to Register Page */}
                <div className="text-center">
                    <p className="text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
