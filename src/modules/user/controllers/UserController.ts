import { JsonController, Get, Post, Put, Param, Body, Res } from 'routing-controllers';
import { Response } from 'express';
import { Inject } from 'typedi';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import UserService from '../services/UserService';

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
@JsonController('/users')
export class UserController {
    constructor(
        @Inject() private userService: UserService
    ) {}

    @Get('/')
    async getAll(@Res() response: Response) {
        const users = await this.userService.getAllUsers();
        return response.json(users);
    }

    /**
     * @swagger
     * /api/users/{id}:
     *   get:
     *     summary: Get a user by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: User found
     *       404:
     *         description: User not found
     */
    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
        const user = await this.userService.getUserById(id);
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }
        return response.json(user);
    }

    /**
     * @swagger
     * /api/users:
     *   post:
     *     summary: Create a new user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateUserDto'
     *     responses:
     *       201:
     *         description: User created successfully
     */
    @Post('/')
    async create(@Body() userData: CreateUserDto, @Res() response: Response) {
        try {
            const user = await this.userService.createUser(userData);
            return response.status(201).json(user);
        } catch (error) {
            console.error('Error creating user:', error);
            return response.status(500).json({ message: 'Error creating user', error });
        }
    }

    /**
     * @swagger
     * /api/users/{id}:
     *   put:
     *     summary: Update a user by ID
     *     tags: [Users]
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
     *             $ref: '#/components/schemas/UpdateUserDto'
     *     responses:
     *       200:
     *         description: User updated successfully
     *       404:
     *         description: User not found
     *      500:
     *       description: Error updating user
    */

    @Put('/:id')
    async update(@Param('id') id: number, @Body() userData: UpdateUserDto, @Res() response: Response) {
        try {
            const user = await this.userService.updateUser(id, userData);
            return response.json(user);
        } catch (error) {
            console.error('Error updating user:', error);
            return response.status(500).json({ message: 'Error updating user', error });
        }
    }
}
