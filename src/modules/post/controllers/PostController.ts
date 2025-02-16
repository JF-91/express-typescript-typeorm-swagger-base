import { JsonController, Get, Post, Put, Delete, Param, Body, Res } from 'routing-controllers';
import { Response } from 'express';
import { CreatePostDto } from '@modules/post/dtos/CreatePostDto';
import { UpdatePostDto } from '@modules/post/dtos/UpdatePostDto';
import PostService from '@modules/post/services/PostService';

@JsonController('/posts')
export class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    @Get('/')
    async getAll(@Res() response: Response) {
        const posts = await this.postService.getAllPosts();
        return response.json(posts);
    }

    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
        const post = await this.postService.getPostById(id);
        if (!post) {
            return response.status(404).json({ message: 'Post not found' });
        }
        return response.json(post);
    }

    @Post('/')
    async create(@Body() postData: CreatePostDto, @Res() response: Response) {
        try {
            const post = await this.postService.createPost(postData);
            return response.status(201).json(post);
        } catch (error) {
            console.error('Error creating post:', error);
            return response.status(500).json({ message: 'Error creating post', error });
        }
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() postData: UpdatePostDto, @Res() response: Response) {
        try {
            const post = await this.postService.updatePost(id, postData);
            return response.json(post);
        } catch (error) {
            console.error('Error updating post:', error);
            return response.status(500).json({ message: 'Error updating post', error });
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @Res() response: Response) {
        try {
            const post = await this.postService.deletePost(id);
            return response.json(post);
        } catch (error) {
            console.error('Error deleting post:', error);
            return response.status(500).json({ message: 'Error deleting post', error });
        }
    }
}