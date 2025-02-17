import { Service } from 'typedi';
import { PrismaClient, Block, BlockImage, BlockVideo, Prisma } from '@prisma/client';
import { CreateBlockDto, CreateBlockImageDto, CreateBlockVideoDto } from '../dtos/CreateBlockDto';
import { IBlock } from '../interfaces/IBlock';

const prisma = new PrismaClient();

@Service()
class BlockService {
    async getAllBlocks(): Promise<(Block & { images: BlockImage[]; videos: BlockVideo[] })[]> {
        return prisma.block.findMany({
            include: {
                images: true,
                videos: true
            }
        });
    }

    async getBlockById(id: number): Promise<(Block & { 
        images: BlockImage[];
        videos: BlockVideo[];
    }) | null> {
        return prisma.block.findUnique({
            where: { id },
            include: {
                images: true,
                videos: true
            }
        });
    }

    async createBlock(blockData: CreateBlockDto): Promise<Block & {
        images: BlockImage[];
        videos: BlockVideo[];
    }> {
        const { images = [], videos = [], ...blockInfo } = blockData;
        
        return prisma.block.create({
            data: {
                ...blockInfo,
                images: {
                    create: images.map((image: CreateBlockImageDto) => ({
                        url: image.url,
                        alt: image.alt,
                        width: image.width,
                        height: image.height,
                        order: image.order || 0
                    }))
                },
                videos: {
                    create: videos.map((video: CreateBlockVideoDto) => ({
                        url: video.url,
                        alt: video.alt,
                        width: video.width,
                        height: video.height
                    }))
                }
            },
            include: {
                images: true,
                videos: true
            }
        });
    }

    async updateBlock(id: number, blockData: CreateBlockDto): Promise<Block & {
        images: BlockImage[];
        videos: BlockVideo[];
    }> {
        const { images = [], videos = [], ...blockInfo } = blockData;

        // Primero eliminamos las imágenes y videos existentes
        await prisma.$transaction([
            prisma.blockImage.deleteMany({ where: { blockId: id } }),
            prisma.blockVideo.deleteMany({ where: { blockId: id } })
        ]);

        // Luego actualizamos el bloque con las nuevas imágenes y videos
        return prisma.block.update({
            where: { id },
            data: {
                ...blockInfo,
                images: {
                    create: images.map((image: CreateBlockImageDto) => ({
                        url: image.url,
                        alt: image.alt,
                        width: image.width,
                        height: image.height,
                        order: image.order || 0
                    }))
                },
                videos: {
                    create: videos.map((video: CreateBlockVideoDto) => ({
                        url: video.url,
                        alt: video.alt,
                        width: video.width,
                        height: video.height
                    }))
                }
            },
            include: {
                images: true,
                videos: true
            }
        });
    }

    async deleteBlock(id: number): Promise<Block> {
        return prisma.block.delete({
            where: { id },
            include: {
                images: true,
                videos: true
            }
        });
    }
}

export default BlockService;
