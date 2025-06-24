import { useState } from "react";
import { X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useCart } from "@/contexts/cart-context";
import { sendWhatsAppOrder } from "@/lib/whatsapp";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { CustomerInfo } from "@shared/schema";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [formData, setFormData] = useState<CustomerInfo>({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    deliveryDate: "",
    orderNotes: "",
  });

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerPhone || !formData.customerAddress || !deliveryDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      sendWhatsAppOrder({
        ...formData,
        deliveryDate: deliveryDate!.toISOString().split('T')[0],
        items,
      });

      toast({
        title: "Pedido enviado!",
        description: "Seu pedido foi enviado via WhatsApp. Aguarde o contato da nossa equipe.",
      });

      clearCart();
      onClose();
      
      // Reset form
      setFormData({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        customerAddress: "",
        deliveryDate: "",
        orderNotes: "",
      });
      setDeliveryDate(undefined);
    } catch (error) {
      toast({
        title: "Erro ao enviar pedido",
        description: "Ocorreu um erro ao enviar seu pedido. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  // Function to check if a date is Sunday
  const isSunday = (date: Date) => {
    return date.getDay() === 0;
  };

  // Function to disable dates that are not Sundays or in the past
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !isSunday(date) || date < today;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-semibold text-bakery-brown">
              Finalizar Pedido
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="customerName">Nome Completo *</Label>
              <Input
                id="customerName"
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="customerPhone">Telefone *</Label>
              <Input
                id="customerPhone"
                type="tel"
                required
                placeholder="(11) 99999-9999"
                value={formData.customerPhone}
                onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="customerEmail">Email</Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="customerAddress">Endereço de Entrega *</Label>
              <Textarea
                id="customerAddress"
                required
                rows={3}
                placeholder="Rua, número, complemento, bairro, cidade"
                value={formData.customerAddress}
                onChange={(e) => handleInputChange("customerAddress", e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="deliveryDate">Data de Entrega (Domingos) *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-1"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {deliveryDate ? (
                      format(deliveryDate, "PPPP", { locale: ptBR })
                    ) : (
                      <span className="text-muted-foreground">Selecione um domingo</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={deliveryDate}
                    onSelect={setDeliveryDate}
                    disabled={isDateDisabled}
                    initialFocus
                    locale={ptBR}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-gray-500 mt-1">
                Entregas disponíveis apenas aos domingos
              </p>
            </div>
            
            <div>
              <Label htmlFor="orderNotes">Observações</Label>
              <Textarea
                id="orderNotes"
                rows={3}
                placeholder="Alguma observação especial sobre o pedido..."
                value={formData.orderNotes}
                onChange={(e) => handleInputChange("orderNotes", e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="border-t pt-6">
              <div className="flex justify-between items-center text-lg font-semibold mb-4">
                <span>Total do Pedido:</span>
                <span className="text-bakery-brown">R$ {total.toFixed(2)}</span>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 font-semibold transition-colors"
              >
                <span className="mr-2">📱</span>
                Enviar Pedido via WhatsApp
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
