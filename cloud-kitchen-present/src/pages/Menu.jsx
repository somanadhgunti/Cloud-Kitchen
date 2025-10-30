// src/pages/Menu.jsx (Vite Adjusted)
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL; // VITE adjustment

export default function Menu() {
    const navigate = useNavigate();
    const { addOrder } = useAuth(); 
    
    const [brands, setBrands] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [selectedBrand, setSelectedBrand] = useState(null); 

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/brands`);
                setBrands(data);

                const params = new URLSearchParams(window.location.search);
                const brandId = params.get('brand');
                
                const initialBrand = data.find(x => x.brandId === brandId) || data[0];
                setSelectedBrand(initialBrand);

                document.title = `Menu — ${initialBrand?.name || 'Loading'}`;
            } catch (error) {
                console.error("Failed to fetch brands:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBrands();
    }, [window.location.search]);

    useEffect(() => {
        setCartItems({});
    }, [selectedBrand]);


    function add(item) {
        const uniqueItemId = `${selectedBrand.brandId}-${item.id}`; 
        setCartItems(prevItems => {
            const currentQuantity = prevItems[uniqueItemId] ? prevItems[uniqueItemId].quantity : 0;
            return {
                ...prevItems,
                [uniqueItemId]: {
                    ...item, 
                    uniqueId: uniqueItemId, 
                    quantity: currentQuantity + 1
                }
            };
        });
    }

    const remove = useCallback((uniqueItemId) => {
        setCartItems(prevItems => {
            const newItems = { ...prevItems };
            const currentItem = newItems[uniqueItemId];

            if (currentItem && currentItem.quantity > 1) {
                newItems[uniqueItemId].quantity -= 1;
            } else if (currentItem && currentItem.quantity === 1) {
                delete newItems[uniqueItemId]; 
            }
            return newItems;
        });
    }, []);


    const aggregatedCart = useMemo(() => {
        return Object.values(cartItems);
    }, [cartItems]);

    const totalAmount = useMemo(() => {
        return aggregatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [aggregatedCart]);


    async function checkout() {
        if (aggregatedCart.length === 0) return;

        const orderItems = aggregatedCart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
        }));

        const newOrderData = {
            brand: selectedBrand.name,
            items: orderItems,
            total: parseFloat(totalAmount.toFixed(2)),
            customerInfo: { name: "Guest Customer", email: "guest@example.com" } 
        };

        try {
            const orderId = await addOrder(newOrderData); 

            alert(`Order placed successfully! Your Order ID is: ${orderId}. Total: ₹${totalAmount.toFixed(2)}.`);
            setCartItems({}); 
        } catch (error) {
            alert('Failed to place order. Please try again.');
        }
    }

    if (loading || !selectedBrand) {
        return <div style={{textAlign: 'center', padding: '100px'}}>Loading Menu...</div>;
    }

    return (
        <div style={{ padding: '60px 5%', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#d4af37', textAlign: 'center', marginBottom: '40px' }}>
                Menu & Orders ({selectedBrand.name})
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 3fr 1.2fr', gap: '30px', alignItems: 'start' }}>
                {/* Left Column: Brands */}
                <div style={{ background: '#f7f7f7', padding: '20px', borderRadius: '12px', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '20px', color: '#001f3f' }}>All Brands</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {brands.map(brand => (
                            <li
                                key={brand.brandId}
                                onClick={() => navigate(`/menu?brand=${brand.brandId}`)} 
                                style={{
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '8px',
                                    background: brand.brandId === selectedBrand.brandId ? '#d4af37' : '#fff', 
                                    color: brand.brandId === selectedBrand.brandId ? '#001f3f' : '#001f3f',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                    transition: '0.2s',
                                }}
                            >{brand.name}</li>
                        ))}
                    </ul>
                </div>

                {/* Center Column: Menu Items */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                    {selectedBrand.menu.map(m => (
                        <div
                            key={m.id} 
                            style={{
                                background: '#001f3f',
                                color: 'white',
                                borderRadius: '12px',
                                padding: '15px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            }}
                        >
                            <h4 style={{ marginBottom: '10px', fontSize: '1.3rem' }}>{m.name}</h4>
                            <p style={{ color: '#ccc', flexGrow: 1 }}>{m.desc}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                                <div style={{ fontWeight: 'bold' }}>₹{m.price}</div>
                                <button
                                    onClick={() => add(m)} 
                                    style={{
                                        padding: '6px 14px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: '#d4af37',
                                        color: '#001f3f',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        transition: '0.2s',
                                    }}
                                >Add ({cartItems[`${selectedBrand.brandId}-${m.id}`]?.quantity || 0}) 
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Cart */}
                <aside
                    style={{
                        background: '#001f3f',
                        color: 'white',
                        borderRadius: '12px',
                        padding: '20px',
                        position: 'sticky',
                        top: '20px',
                        height: 'fit-content',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}
                >
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Cart</h3>
                    {aggregatedCart.length === 0 ? (
                        <div style={{ color: '#ccc' }}>Cart is empty</div>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
                            {aggregatedCart.map(it => (
                                <li
                                    key={it.uniqueId} 
                                    style={{
                                        marginBottom: '10px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span>{it.name} (x{it.quantity}) — ₹{(it.price * it.quantity).toFixed(2)}</span>
                                    <button
                                        onClick={() => remove(it.uniqueId)} 
                                        style={{
                                            padding: '2px 6px',
                                            borderRadius: '6px',
                                            border: 'none',
                                            background: '#ff4d4f',
                                            color: 'white',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem',
                                        }}
                                    >-1</button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>Total: ₹{totalAmount.toFixed(2)}</div>
                    <button
                        disabled={aggregatedCart.length === 0}
                        onClick={checkout} 
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: 'none',
                            background: '#d4af37',
                            color: '#001f3f',
                            fontWeight: 'bold',
                            cursor: aggregatedCart.length === 0 ? 'not-allowed' : 'pointer',
                        }}
                    >Checkout</button>
                </aside>
            </div>
        </div>
    );
}