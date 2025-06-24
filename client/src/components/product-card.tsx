import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
    });
  };

  const getBadgeColor = (category: string) => {
    switch (category) {
      case "chocolate":
        return "bg-bakery-brown text-white";
      case "casamento":
        return "bg-bakery-pink text-bakery-brown";
      case "aniversario":
        return "bg-yellow-400 text-bakery-brown";
      case "gourmet":
        return "bg-bakery-brown text-white";
      default:
        return "bg-bakery-orange text-white";
    }
  };

  const getBadgeText = (category: string) => {
    switch (category) {
      case "chocolate":
        return "Bestseller";
      case "casamento":
        return "Casamento";
      case "aniversario":
        return "Aniversário";
      case "gourmet":
        return "Gourmet";
      default:
        return "Especial";
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(product.category)}`}>
            {getBadgeText(product.category)}
          </span>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-heading font-semibold text-bakery-brown mb-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 font-body leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-bakery-brown font-heading">
            R$ {parseFloat(product.price).toFixed(2)}
          </span>
          {product.rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
          )}
        </div>
        
        <Button
          onClick={handleAddToCart}
          className="w-full bg-bakery-orange hover:bg-bakery-light-brown text-white py-3 px-4 font-semibold transition-colors"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </CardContent>
    </Card>
  );
}
