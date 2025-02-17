import { JsonController, Get, Post, Put, Delete, Param, Body, Res } from 'routing-controllers';
import { Response } from 'express';
import { Inject } from 'typedi';
import { CreateRoleDto } from '../dtos/CreateRoleDto';
import RoleService from '../services/RoleService';

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
@JsonController('/roles')
export class RoleController {
    constructor(
        @Inject() private roleService: RoleService
    ) {}

    @Get('/')
    async getAll(@Res() response: Response) {
        const roles = await this.roleService.getAllRoles();
        return response.json(roles);
    }

    /**
     * @swagger
     * /api/roles/{id}:
     *   get:
     *     summary: Get a role by ID
     *     tags: [Roles]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Role found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Role'
     *       404:
     *         description: Role not found
     */
    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
        const role = await this.roleService.getRoleById(id);
        if (!role) {
            return response.status(404).json({ message: 'Role not found' });
        }
        return response.json(role);
    }

    /**
     * @swagger
     * /api/roles:
     *   post:
     *     summary: Create a new role
     *     tags: [Roles]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateRoleDto'
     *     responses:
     *       201:
     *         description: Role created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Role'
     *       400:
     *         description: Invalid input data
     */
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

    /**
     * @swagger
     * /api/roles/{id}:
     *   put:
     *     summary: Update a role
     *     tags: [Roles]
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
     *             $ref: '#/components/schemas/CreateRoleDto'
     *     responses:
     *       200:
     *         description: Role updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Role'
     *       404:
     *         description: Role not found
     */
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

    /**
     * @swagger
     * /api/roles/{id}:
     *   delete:
     *     summary: Delete a role
     *     tags: [Roles]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Role deleted successfully
     *       404:
     *         description: Role not found
     *       400:
     *         description: Cannot delete role with associated users
     */
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
