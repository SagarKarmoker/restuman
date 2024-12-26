import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';  // For toast notifications
import Swal from 'sweetalert2';  // For SweetAlert popups
import { AuthContext } from '../providers/AuthProvider';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { user, createUser, updateUserProfile } = useContext(AuthContext);

    if(user) {
        return <Navigate to="/dashboard" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long.');
            return;
        }

        try {
            setLoading(true);
            await createUser(email, password);
            await updateUserProfile(name, photoURL);
            Swal.fire('Registration Successful', 'You have successfully registered.', 'success');

            return <Navigate to="/dashboard" />;
        } catch (error) {
            setError(error.message);
            Swal.fire('Registration Failed', error.message, 'error');
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200 px-5">
            <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center">Register</h2>

                {/* Registration Form */}
                <form onSubmit={handleSubmit}>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your photo URL"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    {/* Register Button */}
                    <div className="flex justify-center mb-4">
                        <button type="submit" className="btn btn-primary w-full">
                            {loading ? 'Please wait...' : 'Register'}
                        </button>
                    </div>
                </form>

                {/* Link to Login Page */}
                <div className="text-center">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
