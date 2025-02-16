import { JsonController, Get, Post, Put, Delete, Param, Body, Res } from 'routing-controllers';
import { Response } from 'express';
import { CreatePermissionDto } from '../dtos/CreatePermissionDto';
import PermissionService from '../services/PermissionService';

@JsonController('/permissions')
export class PermissionController {
    private permissionService: PermissionService;

    constructor() {
        this.permissionService = new PermissionService();
    }

    @Get('/')
    async getAll(@Res() response: Response) {
        const permissions = await this.permissionService.getAllPermissions();
        return response.json(permissions);
    }

    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
        const permission = await this.permissionService.getPermissionById(id);
        if (!permission) {
            return response.status(404).json({ message: 'Permission not found' });
        }
        return response.json(permission);
    }

    @Post('/')
    async create(@Body() permissionData: CreatePermissionDto, @Res() response: Response) {
        try {
            const permission = await this.permissionService.createPermission(permissionData);
            return response.status(201).json(permission);
        } catch (error) {
            console.error('Error creating permission:', error);
            return response.status(500).json({ message: 'Error creating permission', error });
        }
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() permissionData: CreatePermissionDto, @Res() response: Response) {
        try {
            const permission = await this.permissionService.updatePermission(id, permissionData);
            return response.json(permission);
        } catch (error) {
            console.error('Error updating permission:', error);
            return response.status(500).json({ message: 'Error updating permission', error });
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @Res() response: Response) {
        try {
            const permission = await this.permissionService.deletePermission(id);
            return response.json(permission);
        } catch (error) {
            console.error('Error deleting permission:', error);
            return response.status(500).json({ message: 'Error deleting permission', error });
        }
    }
}
