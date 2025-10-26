// src/pages/Menu.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { BRANDS } from '../data/mock'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 


export default function Menu() {
  const navigate = useNavigate();
  const { addOrder } = useAuth();
  
  const [cartItems, setCartItems] = useState({});
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brandId = params.get('brand');
    const b = BRANDS.find(x => x.id === brandId) || BRANDS[0];
    setSelectedBrand(b);
    document.title = `Menu — ${b.name}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', `Menu for ${b.name} — order online`);
    
    setCartItems({}); 
  }, [window.location.search]);

  function add(item) {
    const uniqueItemId = `${selectedBrand.id}-${item.id}`; 
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

  function remove(uniqueItemId) {
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
  }

  const aggregatedCart = useMemo(() => {
    return Object.values(cartItems);
  }, [cartItems]);

  const totalAmount = useMemo(() => {
    return aggregatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [aggregatedCart]);


  function checkout() {
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
        status: 'New Order', 
        timestamp: new Date().toISOString(),
    };

    // CRITICAL: This call writes the order directly to Local Storage
    const orderId = addOrder(newOrderData);

    alert(`Order placed successfully! Your Order ID is: ${orderId}. Total: ₹${totalAmount.toFixed(2)}.`);
    setCartItems({}); 
  }

  return (
    <div style={{ padding: '60px 5%', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '2.5rem', color: '#d4af37', textAlign: 'center', marginBottom: '40px' }}>
        Menu & Orders
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 3fr 1.2fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Left Column: Brands */}
        <div style={{ background: '#f7f7f7', padding: '20px', borderRadius: '12px', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '20px', color: '#001f3f' }}>All Brands</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {BRANDS.map(brand => (
              <li
                key={brand.id}
                onClick={() => navigate(`/menu?brand=${brand.id}`)}
                style={{
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  background: brand.id === selectedBrand.id ? '#d4af37' : '#fff',
                  color: brand.id === selectedBrand.id ? '#001f3f' : '#001f3f',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  transition: '0.2s',
                }}
              >
                {brand.name}
              </li>
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
                >
                  Add ({cartItems[`${selectedBrand.id}-${m.id}`]?.quantity || 0}) 
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
              {/* Display grouped items */}
              {aggregatedCart.map(it => (
                <li
                  key={it.uniqueId} // Use the unique ID as the list key
                  style={{
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{it.name} (x{it.quantity}) — ₹{(it.price * it.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => remove(it.uniqueId)} // Use the unique ID for removal
                    style={{
                      padding: '2px 6px',
                      borderRadius: '6px',
                      border: 'none',
                      background: '#ff4d4f',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                    }}
                  >
                    -1
                  </button>
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
          >
            Checkout
          </button>
        </aside>
      </div>
    </div>
  );
}