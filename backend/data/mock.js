//data/mock.js 

export const BRANDS = [
  {
    id: "savorly",
    name: "Savorly",
    desc: "Fresh and modern delicacies to tantalize your taste buds.",
    img: '/images/savorly.png',
    menu: [
      { id: 1, name: "Grilled Sandwich", desc: "Crispy and cheesy", price: 120 },
      { id: 2, name: "Pasta Alfredo", desc: "Creamy Italian pasta", price: 250 },
      { id: 3, name: "Veg Wrap", desc: "Healthy veggie wrap", price: 150 },
      { id: 4, name: "Mango Smoothie", desc: "Fresh mango shake", price: 100 },
      { id: 5, name: "Chocolate Cake", desc: "Rich and creamy", price: 200 },
    ],
  },
  {
    id: "wrapwave",
    name: "WrapWave",
    desc: "Delicious wraps and rolls for every mood.",
    img: '/images/wrapwave.png',
    menu: [
      { id: 1, name: "Chicken Wrap", desc: "Spicy grilled chicken", price: 180 },
      { id: 2, name: "Paneer Wrap", desc: "Grilled paneer with veggies", price: 160 },
      { id: 3, name: "Falafel Wrap", desc: "Middle-Eastern style", price: 170 },
      { id: 4, name: "Fruit Salad", desc: "Fresh seasonal fruits", price: 90 },
      { id: 5, name: "Lemonade", desc: "Refreshing drink", price: 60 },
    ],
  },
  {
    id: "greenharvest",
    name: "Green Harvest",
    desc: "Authentic traditional vegetarian meals with a homely touch.",
    img: '/images/greenharvest.png',
    menu: [
      { id: 1, name: "Paneer Butter Masala", desc: "Creamy cottage cheese in rich tomato gravy", price: 220 },
      { id: 2, name: "Aloo Gobi", desc: "Spiced potato and cauliflower curry", price: 180 },
      { id: 3, name: "Dal Tadka", desc: "Yellow lentils tempered with spices", price: 150 },
      { id: 4, name: "Jeera Rice", desc: "Fragrant cumin-flavored basmati rice", price: 120 },
      { id: 5, name: "Mixed Vegetable Roti Roll", desc: "Fresh vegetables rolled in whole wheat roti", price: 140 },
    ],
  },
  {
    id: "spicegarden",
    name: "Spice Garden",
    desc: "Delicious vegetarian dishes inspired by classic Indian flavors.",
    img: '/images/spicegarden.png',
    menu: [
      { id: 1, name: "Chole Bhature", desc: "Spicy chickpeas served with fluffy fried bread", price: 200 },
      { id: 2, name: "Palak Paneer", desc: "Cottage cheese in creamy spinach gravy", price: 210 },
      { id: 3, name: "Vegetable Biryani", desc: "Aromatic rice with mixed vegetables and spices", price: 250 },
      { id: 4, name: "Roti / Naan", desc: "Freshly baked Indian bread", price: 40 },
      { id: 5, name: "Gajar Halwa", desc: "Sweet carrot pudding with nuts", price: 120 },
    ],
  }
];

export const POSTS = [
  { id:'p1', title:'How Cloud Kitchens Scale Brands Fast', excerpt:'Cloud kitchens allow rapid scaling by centralizing operations and using data-driven workflows.', date:'2025-06-10' },
  { id:'p2', title:'Optimizing Delivery Routes for Speed', excerpt:'Simple heuristics and rider pools help reduce ETA and increase on-time delivery.', date:'2025-05-21' }
];

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1546069901-eacef0df6022?q=80&w=1600&auto=format&fit=crop'

export const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'password123'
};

// Initial orders data passed to the Context State
export const INITIAL_ORDERS = [
    {
        id: 'CKO-001',
        brand: 'Savorly',
        items: [
            { name: 'Grilled Sandwich', quantity: 2, price: 120 },
            { name: 'Pasta Alfredo', quantity: 1, price: 250 }
        ],
        total: 490, 
        status: 'Preparing',
        timestamp: new Date('2025-10-25T10:00:00Z').toISOString(),
    },
    {
        id: 'CKO-002',
        brand: 'WrapWave',
        items: [
            { name: 'Chicken Wrap', quantity: 1, price: 180 },
            { name: 'Lemonade', quantity: 4, price: 60 }
        ],
        total: 420, 
        status: 'Ready for Pickup',
        timestamp: new Date('2025-10-25T11:30:00Z').toISOString(),
    }
];