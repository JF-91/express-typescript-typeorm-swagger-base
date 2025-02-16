import { JsonController, Get, Post, Put, Param, Body, Res } from 'routing-controllers';
import { Response } from 'express';
import { CreateUserDto } from '@modules/user/dtos/CreateUserDto';
import { UpdateUserDto } from '@modules/user/dtos/UpdateUserDto';
import UserService from '@modules/user/services/UserService';

@JsonController('/users')
export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    @Get('/')
    async getAll(@Res() response: Response) {
        const users = await this.userService.getAllUsers();
        return response.json(users);
    }

    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
        const user = await this.userService.getUserById(id);
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }
        return response.json(user);
    }

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
