import { JsonController, Get, Post, Put, Delete, Param, Body, Res } from 'routing-controllers';
import { Response } from 'express';
import { CreatePageDto } from '../dtos/CreatePageDto';
import PageService from '../services/PageService';

@JsonController('/pages')
export class PageController {
    private pageService: PageService;

    constructor() {
        this.pageService = new PageService();
    }

    @Get('/')
    async getAll(@Res() response: Response) {
        const pages = await this.pageService.getAllPages();
        return response.json(pages);
    }

    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
        const page = await this.pageService.getPageById(id);
        if (!page) {
            return response.status(404).json({ message: 'Page not found' });
        }
        return response.json(page);
    }

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
