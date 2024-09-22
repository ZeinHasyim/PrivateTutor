export type Pembelajaran =  {
    id: string;
    orderIdx: string;
    price: number,
    member_id: string,
    teacher_id: string,
    teacher_name: string,
    status: string,
    progres: [
        id: string,
        description: string,
        description: string,
        created_at: Date,
        updated_at: Date
    ],
    created_at: Date
    updated_at: Date
  }
