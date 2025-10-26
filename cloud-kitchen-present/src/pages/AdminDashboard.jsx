import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

// Status constants for cleaner code
const STATUSES = {
    PROCESSING: 'Processing',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED: 'Delivered',
};

// Simple Modal Styles (must be defined outside the component)
const modalOverlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', 
    justifyContent: 'center', alignItems: 'center', zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: 'white', padding: '30px', borderRadius: '8px', 
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)', maxWidth: '500px', 
    width: '90%', zIndex: 1001,
};

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { isAdminLoggedIn, logout, getOrders, updateOrderStatus } = useAuth(); 

    // Local state to hold the fetched orders
    const [orders, setOrders] = useState([]); 
    const [selectedOrder, setSelectedOrder] = useState(null); 

    // Helper to fetch orders and update local state
    // useCallback ensures this function is stable for the useEffect dependency array
    const fetchOrders = useCallback(() => {
        setOrders(getOrders());
    }, [getOrders]);
    
    // Auth Protection and Order Fetching on load
    useEffect(() => {
        if (!isAdminLoggedIn) {
            navigate('/admin-login', { replace: true });
        } else {
            // Fetch the latest order list from Local Storage
            fetchOrders(); 
        }
    }, [isAdminLoggedIn, navigate, fetchOrders]);

    // --- Handle status change ---
    const handleStatusChange = (orderId, newStatus) => {
        // 1. Update Local Storage via Context function
        updateOrderStatus(orderId, newStatus);
        
        // 2. Refresh local state to update the UI immediately
        fetchOrders();
    };

    // Style constants
    const containerStyle = { padding: '30px 5%', minHeight: '80vh' };
    const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '20px' };
    const thTdStyle = { border: '1px solid #ddd', padding: '12px', textAlign: 'left' };
    const headerStyle = { backgroundColor: '#f2f2f2', color: '#333' };
    const buttonStyle = {
        padding: '5px 10px', backgroundColor: '#5e35b1', color: 'white', 
        border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem',
    };
    const statusButtonStyle = {
        padding: '5px 10px', 
        marginRight: '5px',
        border: '1px solid',
        borderRadius: '4px',
        cursor: 'pointer', 
        fontSize: '0.8rem',
        transition: '0.2s',
    };
    
    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    };
    
    const viewOrderDetails = (order) => {
        setSelectedOrder(order);
    };

    const closeModal = () => {
        setSelectedOrder(null);
    };

    if (!isAdminLoggedIn) {
        return null;
    }

    return (
        <div style={containerStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>Admin Dashboard</h1>
                <button 
                    onClick={handleLogout} 
                    style={{ padding: '10px 20px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Logout
                </button>
            </div>
            
            <p>Welcome, Admin! Here are the current customer orders.</p>

            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={{ ...thTdStyle, ...headerStyle }}>Order ID</th>
                        <th style={{ ...thTdStyle, ...headerStyle }}>Brand</th>
                        <th style={{ ...thTdStyle, ...headerStyle }}>Total</th>
                        <th style={{ ...thTdStyle, ...headerStyle }}>Status</th>
                        <th style={{ ...thTdStyle, ...headerStyle }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.slice().reverse().map((order) => ( 
                        <tr key={order.id}>
                            <td style={thTdStyle}>{order.id}</td>
                            <td style={thTdStyle}>{order.brand}</td>
                            <td style={thTdStyle}>₹{order.total.toFixed(2)}</td>
                            
                            {/* --- STATUS MANAGEMENT COLUMN --- */}
                            <td style={thTdStyle}>
                                <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                                    {order.status}
                                </div>
                                <button
                                    onClick={() => handleStatusChange(order.id, STATUSES.PROCESSING)}
                                    style={{ 
                                        ...statusButtonStyle, 
                                        backgroundColor: order.status === STATUSES.PROCESSING ? '#ffeb3b' : '#eee', 
                                        borderColor: '#ffeb3b',
                                    }}
                                >
                                    {STATUSES.PROCESSING}
                                </button>
                                <button
                                    onClick={() => handleStatusChange(order.id, STATUSES.OUT_FOR_DELIVERY)}
                                    style={{ 
                                        ...statusButtonStyle, 
                                        backgroundColor: order.status === STATUSES.OUT_FOR_DELIVERY ? '#2196f3' : '#eee', 
                                        color: order.status === STATUSES.OUT_FOR_DELIVERY ? 'white' : 'black',
                                        borderColor: '#2196f3',
                                    }}
                                >
                                    {STATUSES.OUT_FOR_DELIVERY}
                                </button>
                                <button
                                    onClick={() => handleStatusChange(order.id, STATUSES.DELIVERED)}
                                    style={{ 
                                        ...statusButtonStyle, 
                                        backgroundColor: order.status === STATUSES.DELIVERED ? '#4caf50' : '#eee', 
                                        color: order.status === STATUSES.DELIVERED ? 'white' : 'black',
                                        borderColor: '#4caf50',
                                    }}
                                >
                                    {STATUSES.DELIVERED}
                                </button>
                            </td>
                            
                            {/* --- ACTIONS COLUMN --- */}
                            <td style={thTdStyle}>
                                <button
                                    style={buttonStyle}
                                    onClick={() => viewOrderDetails(order)}
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h3>Order Details: {selectedOrder.id}</h3>
                        <p><strong>Brand:</strong> {selectedOrder.brand}</p>
                        <p><strong>Status:</strong> {selectedOrder.status}</p>
                        <h4>Items:</h4>
                        <ul>
                            {selectedOrder.items.map((item, index) => (
                                <li key={index}>
                                    {item.name} (x{item.quantity}) - ₹{item.price.toFixed(2)} each
                                </li>
                            ))}
                        </ul>
                        <p><strong>Order Total:</strong> ₹{selectedOrder.total.toFixed(2)}</p>
                        <button onClick={closeModal} style={{ ...buttonStyle, marginTop: '20px' }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}