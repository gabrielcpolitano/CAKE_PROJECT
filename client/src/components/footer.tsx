import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-bakery-brown text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-bakery-orange rounded-full flex items-center justify-center mr-3">
                <span className="text-2xl">🎂</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                Doce Encanto
              </h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Bolos artesanais feitos com amor e ingredientes frescos desde 2020. 
              Transformamos momentos especiais em doces memórias inesquecíveis.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/doceencanto" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-bakery-orange transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com/doceencanto" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-bakery-orange transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-bakery-orange transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-6 text-lg">Produtos</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="/products" className="hover:text-bakery-orange transition-colors font-medium">
                  Bolos de Aniversário
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-bakery-orange transition-colors font-medium">
                  Bolos de Casamento
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-bakery-orange transition-colors font-medium">
                  Bolos Temáticos
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-bakery-orange transition-colors font-medium">
                  Bolos Gourmet
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-6 text-lg">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-5 w-5 text-bakery-orange flex-shrink-0" />
                <span className="font-medium">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-5 w-5 text-bakery-orange flex-shrink-0" />
                <span className="font-medium">contato@doceencanto.com</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin className="h-5 w-5 text-bakery-orange flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Rua das Flores, 123</p>
                  <p>Vila Madalena, São Paulo - SP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              &copy; 2024 Doce Encanto. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/about" className="text-gray-300 hover:text-bakery-orange transition-colors">
                Sobre Nós
              </a>
              <a href="/contact" className="text-gray-300 hover:text-bakery-orange transition-colors">
                Contato
              </a>
              <a href="#" className="text-gray-300 hover:text-bakery-orange transition-colors">
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}