import { } from "@prisma/client"
export enum BlockType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    GALLERY = 'GALLERY',
    EMBED = 'EMBED',
    CODE = 'CODE'
}

export interface IBlock {
    id: number;
    name: string;
    content: string;
    headline?: string;
    type: BlockType;
    urls?: any;
    createdAt: Date;
    updatedAt: Date;
    images?: IBlockImage[];
    videos?: IBlockVideo[];
}

export interface IBlockImage {
    id: number;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    order: number;
    blockId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IBlockVideo {
    id: number;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    blockId: number;
    createdAt: Date;
    updatedAt: Date;
}
