// src/pages/AdminDashboard.jsx (Vite Adjusted)
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const STATUSES = {
    PENDING: 'Pending',
    PREPARING: 'Preparing',
    READY_FOR_PICKUP: 'Ready for Pickup',
    DELIVERED: 'Delivered',
};

// --- Style constants (Defined here for clarity) ---
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
// --- End Style Constants ---


export default function AdminDashboard() {
    const navigate = useNavigate();
    const { isAdminLoggedIn, logout, getOrders, updateOrderStatus } = useAuth(); 
    
    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [selectedOrder, setSelectedOrder] = useState(null); 
    
    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const fetchedOrders = await getOrders();
            setOrders(fetchedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
        setLoading(false);
    }, [getOrders]);
    
    useEffect(() => {
        if (!isAdminLoggedIn) {
            navigate('/admin-login', { replace: true }); 
        } else {
            fetchOrders(); 
        }
    }, [isAdminLoggedIn, navigate, fetchOrders]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            fetchOrders(); 
        } catch (error) {
            alert('Failed to update status. Check console.');
        }
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


    if (!isAdminLoggedIn || loading) {
        return <div style={{padding: '50px', textAlign: 'center', minHeight: '80vh'}}>
            {loading ? 'Loading Orders...' : 'Redirecting to login...'}
        </div>;
    }

    return (
        <div style={containerStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>Admin Dashboard</h1>
                <button 
                    onClick={handleLogout} 
                    style={{ padding: '10px 20px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >Logout</button>
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
                    {orders.map((order) => ( 
                        <tr key={order.orderId}>
                            <td style={thTdStyle}>{order.orderId}</td>
                            <td style={thTdStyle}>{order.brand}</td>
                            <td style={thTdStyle}>₹{order.total.toFixed(2)}</td>
                            
                            <td style={thTdStyle}>
                                <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                                    {order.status}
                                </div>
                                <button
                                    onClick={() => handleStatusChange(order.orderId, STATUSES.PREPARING)}
                                    style={{ 
                                        ...statusButtonStyle, 
                                        backgroundColor: order.status === STATUSES.PREPARING ? '#ffeb3b' : '#eee', 
                                        borderColor: '#ffeb3b',
                                    }}
                                >{STATUSES.PREPARING}</button>
                                <button
                                    onClick={() => handleStatusChange(order.orderId, STATUSES.READY_FOR_PICKUP)}
                                    style={{ 
                                        ...statusButtonStyle, 
                                        backgroundColor: order.status === STATUSES.READY_FOR_PICKUP ? '#2196f3' : '#eee', 
                                        color: order.status === STATUSES.READY_FOR_PICKUP ? 'white' : 'black',
                                        borderColor: '#2196f3',
                                    }}
                                >{STATUSES.READY_FOR_PICKUP}</button>
                                <button
                                    onClick={() => handleStatusChange(order.orderId, STATUSES.DELIVERED)}
                                    style={{ 
                                        ...statusButtonStyle, 
                                        backgroundColor: order.status === STATUSES.DELIVERED ? '#4caf50' : '#eee', 
                                        color: order.status === STATUSES.DELIVERED ? 'white' : 'black',
                                        borderColor: '#4caf50',
                                    }}
                                >{STATUSES.DELIVERED}</button>
                            </td>
                            <td style={thTdStyle}>
                                <button
                                    style={buttonStyle}
                                    onClick={() => viewOrderDetails(order)}
                                >View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h3>Order Details: {selectedOrder.orderId}</h3>
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