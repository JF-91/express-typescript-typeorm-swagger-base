import { JsonController, Get, Post, Put, Delete, Param, Body, Res } from 'routing-controllers';
import { Response } from 'express';
import { Inject } from 'typedi';
import { CreateBlockDto } from '../dtos/CreateBlockDto';
import BlockService from '../services/BlockService';

/**
 * @swagger
 * /api/blocks:
 *   get:
 *     summary: List all blocks
 *     tags: [Blocks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of blocks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Block'
 */
@JsonController('/blocks')
export class BlockController {
    constructor(
        @Inject() private blockService: BlockService
    ) {}

    @Get('/')
    async getAll(@Res() response: Response) {
        const blocks = await this.blockService.getAllBlocks();
        return response.json(blocks);
    }

    /**
     * @swagger
     * /api/blocks/{id}:
     *   get:
     *     summary: Get a block by ID
     *     tags: [Blocks]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Block found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Block'
     *       404:
     *         description: Block not found
     */
    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
        const block = await this.blockService.getBlockById(id);
        if (!block) {
            return response.status(404).json({ message: 'Block not found' });
        }
        return response.json(block);
    }

    /**
     * @swagger
     * /api/blocks:
     *   post:
     *     summary: Create a new block
     *     tags: [Blocks]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateBlockDto'
     *     responses:
     *       201:
     *         description: Block created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Block'
     */
    @Post('/')
    async create(@Body() blockData: CreateBlockDto, @Res() response: Response) {
        try {
            const block = await this.blockService.createBlock(blockData);
            return response.status(201).json(block);
        } catch (error) {
            console.error('Error creating block:', error);
            return response.status(500).json({ message: 'Error creating block', error });
        }
    }

    /**
     * @swagger
     * /api/blocks/{id}:
     *   put:
     *     summary: Update a block
     *     tags: [Blocks]
     *     security:
     *       - bearerAuth: []
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
     *             $ref: '#/components/schemas/CreateBlockDto'
     *     responses:
     *       200:
     *         description: Block updated successfully
     */
    @Put('/:id')
    async update(@Param('id') id: number, @Body() blockData: CreateBlockDto, @Res() response: Response) {
        try {
            const block = await this.blockService.updateBlock(id, blockData);
            return response.json(block);
        } catch (error) {
            console.error('Error updating block:', error);
            return response.status(500).json({ message: 'Error updating block', error });
        }
    }

    /**
     * @swagger
     * /api/blocks/{id}:
     *   delete:
     *     summary: Delete a block
     *     tags: [Blocks]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Block deleted successfully
     */
    @Delete('/:id')
    async delete(@Param('id') id: number, @Res() response: Response) {
        try {
            const block = await this.blockService.deleteBlock(id);
            return response.json(block);
        } catch (error) {
            console.error('Error deleting block:', error);
            return response.status(500).json({ message: 'Error deleting block', error });
        }
    }
}
