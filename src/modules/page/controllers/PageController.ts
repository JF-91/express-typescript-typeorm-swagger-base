import { JsonController, Get, Post, Put, Delete, Param, Body, Res } from 'routing-controllers';
import { Response } from 'express';
import { Inject } from 'typedi';
import { CreatePageDto } from '../dtos/CreatePageDto';
import PageService from '../services/PageService';

/**
 * @swagger
 * /api/pages:
 *   get:
 *     summary: Get all pages
 *     tags: [Pages]
 *     responses:
 *       200:
 *         description: List of pages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Page'
 */
@JsonController('/pages')
export class PageController {
    constructor(
        @Inject() private pageService: PageService
    ) {}

    @Get('/')
    async getAll(@Res() response: Response) {
        const pages = await this.pageService.getAllPages();
        return response.json(pages);
    }

    /**
     * @swagger
     * /api/pages/{id}:
     *   get:
     *     summary: Get a page by ID
     *     tags: [Pages]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Page found
     *       404:
     *         description: Page not found
     */
    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
        const page = await this.pageService.getPageById(id);
        if (!page) {
            return response.status(404).json({ message: 'Page not found' });
        }
        return response.json(page);
    }

    /**
     * @swagger
     * /api/pages:
     *   post:
     *     summary: Create a new page
     *     tags: [Pages]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreatePageDto'
     *     responses:
     *       201:
     *         description: Page created successfully
     */
    @Post('/')
    async create(@Body() pageData: CreatePageDto, @Res() response: Response) {
        try {
            const page = await this.pageService.createPage(pageData);
            return response.status(201).json(page);
        } catch (error) {
            console.error('Error creating page:', error);
            return response.status(500).json({ message: 'Error creating page', error });
        }
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() pageData: CreatePageDto, @Res() response: Response) {
        try {
            const page = await this.pageService.updatePage(id, pageData);
            return response.json(page);
        } catch (error) {
            console.error('Error updating page:', error);
            return response.status(500).json({ message: 'Error updating page', error });
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @Res() response: Response) {
        try {
            const page = await this.pageService.deletePage(id);
            return response.json(page);
        } catch (error) {
            console.error('Error deleting page:', error);
            return response.status(500).json({ message: 'Error deleting page', error });
        }
    }
}
