export interface IPage {
    id: number;
    title: string;
    content: string;
    slug: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}
