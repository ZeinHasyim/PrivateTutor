export type Profile = {
    id: string;
    guru: string;
    user_id: string;
    category: string;
    price: number;
    ktp: string;
    certificate: [
        {
          file: string;
        }
      ];
    description?: string;
    status?: string;
    created_at: Date
    updated_at: Date
  };
