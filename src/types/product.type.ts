export type Product = {
    id: string;
    user_id: string;
    username: string;
    name: string;
    category: string;
    description?: string;
    image: string;
    price: number;
    created_at: Date
    updated_at: Date
  };
