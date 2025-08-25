import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootLayout } from "../../layouts";
import { toast } from "../../components/ui";
import { SectionHeader } from "../Home/components";
import { BackButton, SearchAndFilter, ProductGrid, type Product } from "./components";

const ProductsScreen = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  // Sample products data - Replace with your actual data source
  const sampleProducts: Product[] = [
    {
      id: "1",
      title: "Premium Leather Bag",
      price: 299.99,
      image: "/images/products/bag1.jpg",
      description: "High-quality leather bag perfect for everyday use",
      category: "Bags",
      inStock: true
    },
    {
      id: "2", 
      title: "Designer Handbag",
      price: 199.99,
      image: "/images/products/bag2.jpg", 
      description: "Stylish designer handbag for special occasions",
      category: "Bags",
      inStock: true
    },
    // Add more sample products as needed
  ];

  // Load products on component mount
  useEffect(() => {
    // Try to get products from localStorage first
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);
      setFilteredProducts(parsedProducts);
    } else {
      // Use sample products if none in localStorage
      setProducts(sampleProducts);
      setFilteredProducts(sampleProducts);
      localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
    
    // Load wishlist items
    loadWishlistItems();
  }, []);

  const loadWishlistItems = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      const userEmail = user.email;
      const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userEmail}`) || '[]');
      const wishlistIds = userWishlist.map((item: Product) => item.id);
      setWishlistItems(wishlistIds);
    }
  };

  // Filter products whenever search or price filters change
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchValue.trim() !== '') {
      const searchTerm = searchValue.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        (product.description && product.description.toLowerCase().includes(searchTerm))
      );
    }

    // Apply price range filter
    if (minPrice !== '') {
      const minPriceNum = Math.max(0, parseFloat(minPrice));
      filtered = filtered.filter(product => product.price >= minPriceNum);
    }

    if (maxPrice !== '') {
      const maxPriceNum = Math.max(0, parseFloat(maxPrice));
      filtered = filtered.filter(product => product.price <= maxPriceNum);
    }

    setFilteredProducts(filtered);
  }, [products, searchValue, minPrice, maxPrice]);

  const handleAddToCart = (productId: string) => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const product = products.find(p => p.id === productId);
    if (product) {
      const user = JSON.parse(currentUser);
      const userEmail = user.email;

      // Get user-specific cart
      let userCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`) || '[]');
      const existingItem = userCart.find((item: any) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        userCart.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(userCart));
      toast.success('Product added to cart!');
    }
  };

  const handleToggleWishlist = (productId: string) => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/auth/login');
      return;
    }

    const product = products.find(p => p.id === productId);
    if (product) {
      const user = JSON.parse(currentUser);
      const userEmail = user.email;

      // Get user-specific wishlist
      let userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userEmail}`) || '[]');
      const existingItemIndex = userWishlist.findIndex((item: Product) => item.id === productId);

      if (existingItemIndex > -1) {
        // Remove from wishlist
        userWishlist.splice(existingItemIndex, 1);
        localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(userWishlist));
        setWishlistItems(prev => prev.filter(id => id !== productId));
        toast.success('Product removed from wishlist!');
      } else {
        // Add to wishlist
        userWishlist.push(product);
        localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(userWishlist));
        setWishlistItems(prev => [...prev, productId]);
        toast.success('Product added to wishlist!');
      }
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <RootLayout>
      <BackButton />
      
      {/* Page Title */}
      <div className="w-full px-5 mt-8">
        <SectionHeader title="All Products" />
      </div>

      {/* Search and Filter Section */}
      <SearchAndFilter
        searchValue={searchValue}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onSearchChange={setSearchValue}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
      />

      {/* Products Grid */}
      <ProductGrid
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onProductClick={handleProductClick}
        wishlistItems={wishlistItems}
      />
    </RootLayout>
  );
};

export default ProductsScreen;
