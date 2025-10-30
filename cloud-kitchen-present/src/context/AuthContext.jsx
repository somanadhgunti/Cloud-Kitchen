// src/context/AuthContext.jsx (Vite Adjusted)
import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL; // Adjusted for Vite
const AUTH_TOKEN_KEY = 'adminToken'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem(AUTH_TOKEN_KEY));
    const isAdminLoggedIn = !!token; 

    const getConfig = useCallback(() => ({
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }), [token]);

    // --- AUTH FUNCTIONS ---
    const login = useCallback(async (email, password) => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post(`${API_URL}/users/login`, { email, password }, config);
            
            localStorage.setItem(AUTH_TOKEN_KEY, data.token);
            setToken(data.token);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setToken(null);
    }, []);

    // --- ORDER FUNCTIONS ---
    
    const addOrder = useCallback(async (newOrderData) => {
        try {
            const { data } = await axios.post(`${API_URL}/orders`, newOrderData);
            console.log(`Order ${data.orderId} saved to database.`);
            return data.orderId;
        } catch (error) {
            console.error('Order Submission Error:', error);
            throw new Error('Could not submit order.');
        }
    }, []);

    const getOrders = useCallback(async () => {
        if (!isAdminLoggedIn) return [];
        try {
            const { data } = await axios.get(`${API_URL}/orders`, getConfig());
            return data;
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            if(error.response?.status === 401) logout(); 
            return [];
        }
    }, [isAdminLoggedIn, getConfig, logout]);
    
    const updateOrderStatus = useCallback(async (orderId, newStatus) => {
        if (!isAdminLoggedIn) return;
        try {
            await axios.put(
                `${API_URL}/orders/${orderId}/status`,
                { newStatus },
                getConfig()
            );
        } catch (error) {
            console.error('Failed to update status:', error);
            throw new Error('Failed to update status.');
        }
    }, [isAdminLoggedIn, getConfig]);

    const contextValue = { 
        isAdminLoggedIn, 
        login, 
        logout,
        getOrders,
        addOrder,
        updateOrderStatus,
        getToken: () => token, 
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);