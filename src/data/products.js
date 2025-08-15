// Product data for Barbara Shop
export const products = [
  // Fashion & Clothing
  {
    id: 1,
    name: "Elegant Summer Dress",
    category: "fashion",
    price: 89.99,
    image: "/src/assets/images/fashion/fashion_1.jpg",
    description: "Beautiful flowing summer dress perfect for any occasion. Made with premium materials for comfort and style.",
    features: ["Premium fabric", "Comfortable fit", "Machine washable", "Available in multiple sizes"],
    inStock: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    category: "fashion",
    price: 79.99,
    image: "/src/assets/images/fashion/fashion_2.webp",
    description: "Timeless denim jacket that pairs perfectly with any outfit. Durable construction with vintage styling.",
    features: ["100% cotton denim", "Classic fit", "Multiple pockets", "Vintage wash"],
    inStock: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: "Designer Handbag",
    category: "fashion",
    price: 149.99,
    image: "/src/assets/images/fashion/fashion_3.webp",
    description: "Luxurious designer handbag crafted with attention to detail. Perfect for both casual and formal occasions.",
    features: ["Genuine leather", "Multiple compartments", "Adjustable strap", "Designer hardware"],
    inStock: true,
    rating: 4.9,
    reviews: 156
  },

  // Electronics
  {
    id: 4,
    name: "Wireless Bluetooth Headphones",
    category: "electronics",
    price: 199.99,
    image: "/src/assets/images/electronics/electronics_1.jpg",
    description: "Premium wireless headphones with noise cancellation and superior sound quality.",
    features: ["Active noise cancellation", "30-hour battery life", "Quick charge", "Premium sound quality"],
    inStock: true,
    rating: 4.7,
    reviews: 203
  },
  {
    id: 5,
    name: "Gaming Laptop",
    category: "electronics",
    price: 1299.99,
    image: "/src/assets/images/electronics/electronics_2.jpg",
    description: "High-performance gaming laptop with latest graphics and processing power.",
    features: ["Intel i7 processor", "16GB RAM", "RTX graphics", "144Hz display"],
    inStock: true,
    rating: 4.8,
    reviews: 87
  },
  {
    id: 6,
    name: "Smartphone Pro",
    category: "electronics",
    price: 899.99,
    image: "/src/assets/images/electronics/electronics_3.jpg",
    description: "Latest smartphone with advanced camera system and lightning-fast performance.",
    features: ["Triple camera system", "5G connectivity", "All-day battery", "Water resistant"],
    inStock: true,
    rating: 4.6,
    reviews: 312
  },

  // Home & Garden
  {
    id: 7,
    name: "Artificial Plant Collection",
    category: "home_garden",
    price: 59.99,
    image: "/src/assets/images/home_garden/home_garden_1.jpg",
    description: "Beautiful artificial plants that bring life to any space without maintenance.",
    features: ["Realistic appearance", "No maintenance required", "UV resistant", "Multiple sizes"],
    inStock: true,
    rating: 4.5,
    reviews: 78
  },
  {
    id: 8,
    name: "Modern Coffee Table",
    category: "home_garden",
    price: 299.99,
    image: "/src/assets/images/home_garden/home_garden_2.jpg",
    description: "Sleek modern coffee table that complements any living room decor.",
    features: ["Solid wood construction", "Modern design", "Easy assembly", "Scratch resistant"],
    inStock: true,
    rating: 4.7,
    reviews: 45
  },
  {
    id: 9,
    name: "Indoor Plant Set",
    category: "home_garden",
    price: 79.99,
    image: "/src/assets/images/home_garden/home_garden_3.jpg",
    description: "Curated set of indoor plants perfect for creating a green oasis in your home.",
    features: ["Low maintenance", "Air purifying", "Includes planters", "Care instructions included"],
    inStock: true,
    rating: 4.8,
    reviews: 92
  },

  // Beauty & Health
  {
    id: 10,
    name: "Skincare Essentials Kit",
    category: "beauty_health",
    price: 129.99,
    image: "/src/assets/images/beauty_health/beauty_health_1.jpg",
    description: "Complete skincare routine with natural ingredients for healthy, glowing skin.",
    features: ["Natural ingredients", "Suitable for all skin types", "Dermatologist tested", "Complete routine"],
    inStock: true,
    rating: 4.9,
    reviews: 167
  },
  {
    id: 11,
    name: "Premium Makeup Set",
    category: "beauty_health",
    price: 89.99,
    image: "/src/assets/images/beauty_health/beauty_health_2.jpg",
    description: "Professional-grade makeup set with everything you need for a perfect look.",
    features: ["Professional quality", "Long-lasting formula", "Complete set", "Travel-friendly"],
    inStock: true,
    rating: 4.6,
    reviews: 134
  },
  {
    id: 12,
    name: "Wellness Bundle",
    category: "beauty_health",
    price: 199.99,
    image: "/src/assets/images/beauty_health/beauty_health_3.jpg",
    description: "Comprehensive wellness bundle for mind and body health.",
    features: ["Natural supplements", "Aromatherapy oils", "Wellness guide", "30-day supply"],
    inStock: true,
    rating: 4.7,
    reviews: 89
  }
]

export const categories = [
  {
    id: "fashion",
    name: "Fashion & Clothing",
    description: "Trendy clothing and accessories for every style",
    image: "/src/assets/images/fashion/fashion_1.jpg"
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest technology and gadgets",
    image: "/src/assets/images/electronics/electronics_1.jpg"
  },
  {
    id: "home_garden",
    name: "Home & Garden",
    description: "Beautiful items for your home and garden",
    image: "/src/assets/images/home_garden/home_garden_1.jpg"
  },
  {
    id: "beauty_health",
    name: "Beauty & Health",
    description: "Premium beauty and wellness products",
    image: "/src/assets/images/beauty_health/beauty_health_1.jpg"
  }
]

export const getProductsByCategory = (category) => {
  if (!category) return products
  return products.filter(product => product.category === category)
}

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id))
}

export const getFeaturedProducts = () => {
  return products.filter(product => product.rating >= 4.7).slice(0, 6)
}

