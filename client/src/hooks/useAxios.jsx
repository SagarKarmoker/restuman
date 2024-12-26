import axios from 'axios'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../providers/AuthProvider'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    withCredentials: true
})

export default function useAxios() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error.response.status === 401 || error.response.status === 403) {
                console.log("Please login again")
                try {
                    logout();
                    console.log("Logged out")
                    navigate('/login')
                } catch (error) {
                    console.log("Failed to logout")
                }
            }

            return Promise.reject(error);
        })
    }, [])

    return axiosInstance;
}
