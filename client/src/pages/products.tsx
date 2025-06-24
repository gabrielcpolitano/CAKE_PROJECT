import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/navbar";
import ProductFilters from "@/components/product-filters";
import ProductCard from "@/components/product-card";
import CartSidebar from "@/components/cart-sidebar";
import CheckoutModal from "@/components/checkout-modal";
import Footer from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Truck, Heart, Smartphone } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Products() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Filter and sort products
  const filteredAndSortedProducts = products ? products
    .filter(product => selectedCategory === "all" || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "rating":
          return parseFloat(b.rating || "0") - parseFloat(a.rating || "0");
        case "popular":
        default:
          return (b.reviewCount || 0) - (a.reviewCount || 0);
      }
    }) : [];

  const handleCartToggle = () => {
    setCartOpen(!cartOpen);
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setCheckoutOpen(false);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-bakery-light-cream">
        <Navbar onCartToggle={handleCartToggle} />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar produtos</h2>
            <p className="text-gray-600">Não foi possível carregar os produtos. Tente novamente mais tarde.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bakery-light-cream font-body">
      <Navbar onCartToggle={handleCartToggle} />
      
      {/* Hero Section */}
      <section className="bg-gradient-bakery py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-bakery-brown mb-6">
            Nossos Produtos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra nossa seleção completa de bolos artesanais, feitos com ingredientes frescos e muito carinho para tornar seus momentos especiais ainda mais doces.
          </p>
        </div>
      </section>

      <ProductFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      {/* Products Section */}
      <section className="py-12 bg-bakery-light-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!isLoading && filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-bakery-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-bakery-brown mb-2">Entrega aos Domingos</h3>
              <p className="text-gray-600">Entregas programadas todos os domingos para garantir a máxima frescura dos nossos bolos.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-bakery-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-bakery-brown mb-2">Feitos com Amor</h3>
              <p className="text-gray-600">Cada bolo é preparado artesanalmente com ingredientes selecionados e muito carinho.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-bakery-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-bakery-brown mb-2">Pedido Fácil</h3>
              <p className="text-gray-600">Faça seu pedido online e finalize via WhatsApp de forma rápida e prática.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />
      
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={handleCloseCheckout}
      />
    </div>
  );
}