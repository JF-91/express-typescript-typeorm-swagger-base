import { Category } from '@prisma/client';

export interface IPost {
    id: number;
    title: string;
    content: string;
    published: boolean;
    authorId: number | null;
    createdAt: Date;
    updatedAt: Date;
    categories?: Category[];
}