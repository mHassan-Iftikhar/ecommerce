import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header, Footer } from "../../components";
import { toast } from "../../components/ui";
import { 
  ProductDetailsHeader, 
  ProductImage, 
  ProductInfo,
  ProductAccordions,
  RelatedProducts
} from "./components";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
}

const ProductDetailsScreen = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = (productId: string) => {
    try {
      const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
      const foundProduct = products.find((p) => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        document.title = `${foundProduct.title} - E-commerce Store`;
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productId: string) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
      toast.warning('Please login to add items to cart');
      return;
    }

    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const productToAdd = products.find((p) => p.id === productId);

    if (productToAdd) {
      const userEmail = currentUser.email;
      let userCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`) || '[]');
      const existingItem = userCart.find((item: any) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        userCart.push({ ...productToAdd, quantity: 1 });
      }

      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(userCart));
      toast.success('Product added to cart!');
    }
  };

  const handleAddToWishlist = (productId: string) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
      toast.warning('Please login to add items to wishlist');
      return;
    }

    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const productToAdd = products.find((p) => p.id === productId);

    if (productToAdd) {
      const userEmail = currentUser.email;
      let userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userEmail}`) || '[]');
      const existingItem = userWishlist.find((item: Product) => item.id === productId);

      if (existingItem) {
        toast.warning('Product is already in your wishlist!');
      } else {
        userWishlist.push(productToAdd);
        localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(userWishlist));
        toast.success('Product added to wishlist!');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="animate-pulse h-6 bg-gray-200 rounded w-40"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="animate-pulse space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col space-y-2">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
                <div className="flex-1 aspect-square bg-gray-200 rounded-xl"></div>
              </div>
            </div>
            <div className="animate-pulse space-y-6">
              <div className="space-y-3">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                <div className="flex gap-2">
                  <div className="h-10 bg-gray-200 rounded w-20"></div>
                  <div className="h-10 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-gray-200 rounded-full"></div>
                <div className="h-12 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <ProductDetailsHeader />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 w-full">
            <div className="text-center py-16">
              <div className="text-red-500 text-2xl mb-6 font-semibold">Product not found</div>
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                ← Back to Products
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <Header />
      
      {/* Back to Products Button - Outside main container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ProductDetailsHeader />
      </div>
      
      {/* Main Product Section Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Product Section */}
        <div className="rounded-2xl p-6 md:p-8 lg:p-12 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Sticky Image Gallery */}
            <ProductImage 
              image={product.image} 
              title={product.title}
              images={product.images}
            />
            
            {/* Product Info */}
            <div className="space-y-8">
              <ProductInfo 
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
              
              {/* Accordion Sections */}
              <div className="space-y-0 border-t border-gray-200 pt-8">
                <ProductAccordions product={product} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Related Products Section - Outside main container */}
      <div className="w-full bg-gray-50 py-12">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetailsScreen;
