import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider';

export default function Dashboard() {
    const {user} = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8">
            <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Your Dashboard, {user.displayName}!</h1>
                <p className="text-lg text-gray-600 mb-6">Here you can manage all your settings, notifications, and more.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-blue-500 text-white rounded-lg p-6 flex flex-col items-center justify-center shadow-lg hover:bg-blue-600 transition duration-300">
                        <h2 className="text-xl font-bold">Overview</h2>
                        <p className="text-sm mt-2">Get a quick overview of your activities and stats.</p>
                    </div>
                    <div className="bg-green-500 text-white rounded-lg p-6 flex flex-col items-center justify-center shadow-lg hover:bg-green-600 transition duration-300">
                        <h2 className="text-xl font-bold">Settings</h2>
                        <p className="text-sm mt-2">Manage your account settings and preferences.</p>
                    </div>
                    <div className="bg-yellow-500 text-white rounded-lg p-6 flex flex-col items-center justify-center shadow-lg hover:bg-yellow-600 transition duration-300">
                        <h2 className="text-xl font-bold">Notifications</h2>
                        <p className="text-sm mt-2">Check your recent notifications and updates.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
