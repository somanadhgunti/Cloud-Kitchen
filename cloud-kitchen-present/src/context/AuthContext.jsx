// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { INITIAL_ORDERS } from '../data/mock';

// Local Storage Keys
const AUTH_KEY = 'isAdminLoggedIn';
const ORDERS_KEY = 'cloudKitchenOrders';

// Helper functions (initializeOrders, getNextOrderId) remain the same...
const initializeOrders = () => {
    if (!localStorage.getItem(ORDERS_KEY)) {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
    }
    return JSON.parse(localStorage.getItem(ORDERS_KEY));
};

const getNextOrderId = () => {
    const orders = initializeOrders();
    const lastId = orders.length > 0 
        ? orders.slice(-1)[0].id 
        : 'CKO-000';
    
    const nextNumber = parseInt(lastId.split('-')[1]) + 1;
    return `CKO-${String(nextNumber).padStart(3, '0')}`;
};

// 1. Create the Context
export const AuthContext = createContext();

// 2. Create a Provider component
export const AuthProvider = ({ children }) => {
    // Auth State
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
        sessionStorage.getItem(AUTH_KEY) === 'true'
    );

    // Auth Functions (login, logout remain the same)
    const login = () => {
        setIsAdminLoggedIn(true);
        sessionStorage.setItem(AUTH_KEY, 'true');
    };
    const logout = () => {
        setIsAdminLoggedIn(false);
        sessionStorage.removeItem(AUTH_KEY);
    };

    // Order Function: Writes directly to Local Storage (addOrder remains the same)
    const addOrder = useCallback((newOrderData) => {
        const orderId = getNextOrderId();
        const fullOrder = { ...newOrderData, id: orderId };
        
        const currentOrders = initializeOrders();
        const updatedOrders = [...currentOrders, fullOrder];
        
        localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
        
        console.log(`Order ${orderId} saved to Local Storage.`);
        return orderId;
    }, []);

    // Order Function: Reads directly from Local Storage (getOrders remains the same)
    const getOrders = useCallback(() => {
        return initializeOrders();
    }, []);
    
    // --- NEW FUNCTION: Update order status and persist to Local Storage ---
    const updateOrderStatus = useCallback((orderId, newStatus) => {
        const currentOrders = initializeOrders();
        
        const updatedOrders = currentOrders.map(order => {
            if (order.id === orderId) {
                console.log(`Order ${orderId} status changed to ${newStatus}`);
                return { ...order, status: newStatus };
            }
            return order;
        });
        
        localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
        return updatedOrders;
    }, []);
    // ---------------------------------------------------------------------

    const contextValue = { 
        isAdminLoggedIn, 
        login, 
        logout,
        getOrders,
        addOrder,
        updateOrderStatus, // EXPORT NEW FUNCTION
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Custom Hook for easy access
export const useAuth = () => useContext(AuthContext);