import { CreatePageDto } from '../dtos/CreatePageDto';
import { IPage } from '../interfaces/IPage';
import prisma from '@services/prisma';

class PageService {
    async getAllPages(): Promise<IPage[]> {
        return prisma.page.findMany();
    }

    async getPageById(id: number): Promise<IPage | null> {
        return prisma.page.findUnique({ where: { id } });
    }

    async createPage(pageData: CreatePageDto): Promise<IPage> {
        return prisma.page.create({ data: pageData });
    }

    async updatePage(id: number, pageData: CreatePageDto): Promise<IPage> {
        return prisma.page.update({
            where: { id },
            data: pageData,
        });
    }

    async deletePage(id: number): Promise<IPage> {
        return prisma.page.delete({ where: { id } });
    }
}

export default PageService;
