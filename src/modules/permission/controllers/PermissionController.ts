import { JsonController, Get, Post, Put, Delete, Param, Body, Res } from 'routing-controllers';
import { Response } from 'express';
import { Inject } from 'typedi';
import { CreatePermissionDto } from '../dtos/CreatePermissionDto';
import PermissionService from '../services/PermissionService';

/**
 * @swagger
 * /api/permissions:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     responses:
 *       200:
 *         description: List of permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 */
@JsonController('/permissions')
export class PermissionController {
    constructor(
        @Inject() private permissionService: PermissionService
    ) {}

    @Get('/')
    async getAll(@Res() response: Response) {
        const permissions = await this.permissionService.getAllPermissions();
        return response.json(permissions);
    }

    /**
     * @swagger
     * /api/permissions/{id}:
     *   get:
     *     summary: Get a permission by ID
     *     tags: [Permissions]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Permission found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Permission'
     *       404:
     *         description: Permission not found
     */
    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
        const permission = await this.permissionService.getPermissionById(id);
        if (!permission) {
            return response.status(404).json({ message: 'Permission not found' });
        }
        return response.json(permission);
    }

    /**
     * @swagger
     * /api/permissions:
     *   post:
     *     summary: Create a new permission
     *     tags: [Permissions]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreatePermissionDto'
     *     responses:
     *       201:
     *         description: Permission created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Permission'
     *       400:
     *         description: Invalid input data
     */
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

    /**
     * @swagger
     * /api/permissions/{id}:
     *   put:
     *     summary: Update a permission
     *     tags: [Permissions]
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
     *             $ref: '#/components/schemas/CreatePermissionDto'
     *     responses:
     *       200:
     *         description: Permission updated successfully
     *       404:
     *         description: Permission not found
     */
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

    /**
     * @swagger
     * /api/permissions/{id}:
     *   delete:
     *     summary: Delete a permission
     *     tags: [Permissions]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Permission deleted successfully
     *       404:
     *         description: Permission not found
     *       400:
     *         description: Cannot delete permission with associated roles
     */
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
