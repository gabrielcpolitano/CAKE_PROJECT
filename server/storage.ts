import { products, orders, type Product, type InsertProduct, type Order, type InsertOrder } from "@shared/schema";

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: number): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private currentProductId: number;
  private currentOrderId: number;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.currentProductId = 1;
    this.currentOrderId = 1;
    
    // Initialize with sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: Omit<Product, 'id'>[] = [
      {
        name: "Bolo de Chocolate Premium",
        description: "Bolo de chocolate com ganache belga e decoração dourada. Perfeito para ocasiões especiais.",
        price: "89.90",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "chocolate",
        tags: ["premium", "bestseller"],
        rating: "4.9",
        reviewCount: 23,
        isAvailable: 1,
      },
      {
        name: "Bolo de Morango Deluxe",
        description: "Bolo de baunilha com chantilly e morangos frescos. Leve e refrescante.",
        price: "69.90",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "frutas",
        tags: ["fresh", "light"],
        rating: "4.8",
        reviewCount: 31,
        isAvailable: 1,
      },
      {
        name: "Bolo de Casamento Clássico",
        description: "Bolo de três andares com pasta americana e decoração floral. Perfeito para o seu grande dia.",
        price: "299.90",
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "casamento",
        tags: ["wedding", "elegant"],
        rating: "5.0",
        reviewCount: 12,
        isAvailable: 1,
      },
      {
        name: "Bolo de Aniversário Festivo",
        description: "Bolo colorido com decoração festiva e velas. Ideal para celebrar momentos especiais.",
        price: "59.90",
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "aniversario",
        tags: ["colorful", "festive"],
        rating: "4.7",
        reviewCount: 45,
        isAvailable: 1,
      },
      {
        name: "Bolo Red Velvet",
        description: "Clássico bolo americano com cobertura de cream cheese. Sabor único e textura aveludada.",
        price: "79.90",
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "americano",
        tags: ["classic", "velvet"],
        rating: "4.6",
        reviewCount: 28,
        isAvailable: 1,
      },
      {
        name: "Bolo de Limão Siciliano",
        description: "Bolo refrescante de limão siciliano com cobertura cremosa. Perfeito para os dias quentes.",
        price: "64.90",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "citrico",
        tags: ["refreshing", "citrus"],
        rating: "4.5",
        reviewCount: 19,
        isAvailable: 1,
      },
      {
        name: "Bolo de Cenoura Tradicional",
        description: "Bolo de cenoura caseiro com cobertura de chocolate e nozes. Receita da vovó.",
        price: "54.90",
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "tradicional",
        tags: ["homemade", "traditional"],
        rating: "4.8",
        reviewCount: 37,
        isAvailable: 1,
      },
      {
        name: "Bolo Tiramisù",
        description: "Versão em bolo do clássico tiramisù italiano. Com café, mascarpone e cacau.",
        price: "94.90",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "gourmet",
        tags: ["italian", "coffee", "gourmet"],
        rating: "4.9",
        reviewCount: 15,
        isAvailable: 1,
      },
    ];

    sampleProducts.forEach(product => {
      const id = this.currentProductId++;
      const productWithId: Product = { ...product, id };
      this.products.set(id, productWithId);
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id,
      tags: insertProduct.tags || null,
      rating: insertProduct.rating || null,
      reviewCount: insertProduct.reviewCount || null,
      isAvailable: insertProduct.isAvailable || 1
    };
    this.products.set(id, product);
    return product;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = {
      ...insertOrder,
      id,
      customerEmail: insertOrder.customerEmail || null,
      orderNotes: insertOrder.orderNotes || null,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();
