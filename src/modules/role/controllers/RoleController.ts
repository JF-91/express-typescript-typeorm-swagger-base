import { JsonController, Get, Post, Put, Delete, Param, Body, Res } from 'routing-controllers';
import { Response } from 'express';
import { CreateRoleDto } from '../dtos/CreateRoleDto';
import RoleService from '../services/RoleService';

@JsonController('/roles')
export class RoleController {
    private roleService: RoleService;

    constructor() {
        this.roleService = new RoleService();
    }

    @Get('/')
    async getAll(@Res() response: Response) {
        const roles = await this.roleService.getAllRoles();
        return response.json(roles);
    }

    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
        const role = await this.roleService.getRoleById(id);
        if (!role) {
            return response.status(404).json({ message: 'Role not found' });
        }
        return response.json(role);
    }

    @Post('/')
    async create(@Body() roleData: CreateRoleDto, @Res() response: Response) {
        try {
            const role = await this.roleService.createRole(roleData);
            return response.status(201).json(role);
        } catch (error) {
            console.error('Error creating role:', error);
            return response.status(500).json({ message: 'Error creating role', error });
        }
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() roleData: CreateRoleDto, @Res() response: Response) {
        try {
            const role = await this.roleService.updateRole(id, roleData);
            return response.json(role);
        } catch (error) {
            console.error('Error updating role:', error);
            return response.status(500).json({ message: 'Error updating role', error });
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @Res() response: Response) {
        try {
            const role = await this.roleService.deleteRole(id);
            return response.json(role);
        } catch (error) {
            console.error('Error deleting role:', error);
            return response.status(500).json({ message: 'Error deleting role', error });
        }
    }
}
