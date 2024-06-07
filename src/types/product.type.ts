export type Product = {
    id: string;
    name: string;
    category: string;
    description?: string;
    image: string;
    price: number;
    created_at: Date
    updated_at: Date
    stock: [
      {
        size: string;
        qty: number;
      }
    ]; 
  };
  