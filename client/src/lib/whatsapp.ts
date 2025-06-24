import type { CartItem, CustomerInfo } from "@shared/schema";

interface OrderData extends CustomerInfo {
  items: CartItem[];
}

export function formatOrderForWhatsApp(orderData: OrderData): string {
  const total = orderData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  let message = `🎂 *NOVO PEDIDO - DOCE ENCANTO* 🎂\n\n`;
  message += `👤 *Cliente:* ${orderData.customerName}\n`;
  message += `📱 *Telefone:* ${orderData.customerPhone}\n`;
  
  if (orderData.customerEmail) {
    message += `📧 *Email:* ${orderData.customerEmail}\n`;
  }
  
  message += `📍 *Endereço:* ${orderData.customerAddress}\n`;
  message += `📅 *Data de Entrega:* ${new Date(orderData.deliveryDate).toLocaleDateString('pt-BR')}\n\n`;

  message += `🛒 *ITENS DO PEDIDO:*\n`;
  orderData.items.forEach(item => {
    const itemTotal = item.price * item.quantity;
    message += `• ${item.quantity}x ${item.name} - R$ ${itemTotal.toFixed(2)}\n`;
  });

  message += `\n💰 *TOTAL: R$ ${total.toFixed(2)}*\n\n`;

  if (orderData.orderNotes) {
    message += `📝 *Observações:* ${orderData.orderNotes}\n\n`;
  }

  message += `⏰ Pedido feito em: ${new Date().toLocaleString('pt-BR')}`;

  return message;
}

export function sendWhatsAppOrder(orderData: OrderData): void {
  const message = formatOrderForWhatsApp(orderData);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "5517996490503";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  
  window.open(whatsappUrl, "_blank");
}
