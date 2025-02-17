import { JsonController, Get, Post, Put, Delete, Param, Body, Res } from 'routing-controllers';
import { Response } from 'express';
import { Inject } from 'typedi';
import { CreatePostDto } from '../dtos/CreatePostDto';
import { UpdatePostDto } from '../dtos/UpdatePostDto';
import PostService from '../services/PostService';

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
@JsonController('/posts')
export class PostController {
    constructor(
        @Inject() private postService: PostService
    ) {}

    @Get('/')
    async getAll(@Res() response: Response) {
        const posts = await this.postService.getAllPosts();
        return response.json(posts);
    }

    /**
     * @swagger
     * /api/posts/{id}:
     *   get:
     *     summary: Get a post by ID
     *     tags: [Posts]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Post found
     *       404:
     *         description: Post not found
     */
    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
        const post = await this.postService.getPostById(id);
        if (!post) {
            return response.status(404).json({ message: 'Post not found' });
        }
        return response.json(post);
    }

    /**
     * @swagger
     * /api/posts:
     *   post:
     *     summary: Create a new post
     *     tags: [Posts]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreatePostDto'
     *     responses:
     *       201:
     *         description: Post created successfully
     */
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

    /**
     * @swagger
     * /api/posts/{id}:
     *   put:
     *     summary: Update a post
     *     tags: [Posts]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdatePostDto'
     *     responses:
     *       200:
     *         description: Post updated successfully
     */
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

    /**
     * @swagger
     * /api/posts/{id}:
     *   delete:
     *     summary: Delete a post
     *     tags: [Posts]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Post deleted successfully
     */
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