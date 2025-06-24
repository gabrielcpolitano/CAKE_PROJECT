import { useState } from "react";
import Navbar from "@/components/navbar";
import CartSidebar from "@/components/cart-sidebar";
import CheckoutModal from "@/components/checkout-modal";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function About() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-bakery-light-cream font-body">
      <Navbar onCartToggle={handleCartToggle} />
      
      {/* Hero Section */}
      <section className="bg-gradient-bakery py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-bakery-brown mb-6">
                Nossa História
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                A Doce Encanto nasceu em 2020 com a missão de levar doçura e alegria para os momentos mais especiais da sua vida.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Confeiteira preparando bolos"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-bakery-brown mb-8">
              Tradição e Inovação
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Tudo começou na cozinha da nossa fundadora, Maria Silva, que desde pequena tinha paixão pela confeitaria. 
              Com receitas passadas de geração em geração e técnicas modernas, criamos bolos únicos que conquistam paladares.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Hoje, a Doce Encanto é referência em bolos artesanais, atendendo casamentos, aniversários e celebrações 
              especiais em São Paulo e região.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-bakery-light-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-bakery-brown text-center mb-12">
            Nossos Valores
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-bakery-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💝</span>
              </div>
              <h3 className="text-xl font-semibold text-bakery-brown mb-3">Qualidade</h3>
              <p className="text-gray-600">
                Utilizamos apenas ingredientes frescos e de primeira qualidade em todos os nossos produtos.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-bakery-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="text-xl font-semibold text-bakery-brown mb-3">Família</h3>
              <p className="text-gray-600">
                Tratamos cada cliente como família, criando momentos doces e memoráveis para suas celebrações.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-bakery-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-bakery-brown mb-3">Criatividade</h3>
              <p className="text-gray-600">
                Inovamos constantemente em sabores e decorações para surpreender nossos clientes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-bakery-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-bakery-brown mb-3">Sustentabilidade</h3>
              <p className="text-gray-600">
                Comprometidos com práticas sustentáveis e ingredientes locais sempre que possível.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-bakery-brown text-center mb-12">
            Nossa Equipe
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256"
                  alt="Maria Silva"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-bakery-brown mb-2">Maria Silva</h3>
              <p className="text-bakery-orange font-medium mb-2">Fundadora & Chef Confeiteira</p>
              <p className="text-gray-600 text-sm">
                Mais de 15 anos de experiência em confeitaria artesanal e paixão por criar momentos doces.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256"
                  alt="João Santos"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-bakery-brown mb-2">João Santos</h3>
              <p className="text-bakery-orange font-medium mb-2">Chef de Decoração</p>
              <p className="text-gray-600 text-sm">
                Especialista em decoração e design de bolos, transformando cada pedido em uma obra de arte.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256"
                  alt="Ana Costa"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-bakery-brown mb-2">Ana Costa</h3>
              <p className="text-bakery-orange font-medium mb-2">Atendimento ao Cliente</p>
              <p className="text-gray-600 text-sm">
                Responsável por cuidar de cada detalhe do seu pedido e garantir sua completa satisfação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-bakery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-bakery-brown mb-6">
            Pronto para adoçar seu momento especial?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubra nossos sabores únicos e faça seu pedido hoje mesmo. Estamos aqui para tornar sua celebração inesquecível.
          </p>
          <a href="/products">
            <Button className="bg-bakery-orange hover:bg-bakery-light-brown text-white px-8 py-3 text-lg">
              Ver Produtos
            </Button>
          </a>
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