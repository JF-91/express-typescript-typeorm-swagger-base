import { User, Permission } from '@prisma/client';

export interface IRole {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    users?: User[];
    permissions?: Permission[];
}
