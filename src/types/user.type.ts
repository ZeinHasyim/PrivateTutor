export type User = {
    id: string;
    email: string;
    password?: string;
    fullname: string;
    phone: string;
    role: string;
    image: string;
    profile: {
        category: string;
        subcategory: string;
        price: number;
        ktp: string;
        certificate: [
            {
                file: string;
            }
        ];
        pengalaman: [
            {
                name: string;
                year: string;
            }
        ];
        day: [
            {
                hari: string;
                jam: string;
            }
        ];
        description?: string;
    }
    profile_status?: string;
    createdAt: string;
    updatedAt: string;
};
