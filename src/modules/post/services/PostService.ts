import { Service } from 'typedi';
import { CreatePostDto } from '../dtos/CreatePostDto';
import { UpdatePostDto } from '../dtos/UpdatePostDto';
import { IPost } from '../interfaces/IPost';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Service()
class PostService {
    async getAllPosts(): Promise<IPost[]> {
        return prisma.post.findMany({
            include: {
                categories: true,
                author: true
            }
        });
    }

    async getPostById(id: number): Promise<IPost | null> {
        return prisma.post.findUnique({
            where: { id },
            include: {
                categories: true
            }
        });
    }

    async createPost(postData: CreatePostDto): Promise<IPost> {
        return prisma.post.create({
            data: {
                title: postData.title,
                content: postData.content,
                published: postData.published,
                authorId: postData.authorId,
                categories: {
                    connect: postData.categoryIds.map(id => ({ id }))
                }
            },
            include: {
                categories: true
            }
        });
    }

    async updatePost(id: number, postData: UpdatePostDto): Promise<IPost> {
        return prisma.post.update({
            where: { id },
            data: postData,
            include: {
                categories: true
            }
        });
    }

    async deletePost(id: number): Promise<IPost> {
        return prisma.post.delete({
            where: { id }
        });
    }
}

export default PostService;