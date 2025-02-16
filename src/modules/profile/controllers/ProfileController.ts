import { JsonController, Get, Post, Put, Delete, Param, Body, Res } from 'routing-controllers';
import { Response } from 'express';
import { CreateProfileDto } from '../dtos/CreateProfileDto';
import ProfileService from '../services/ProfileService';

@JsonController('/profiles')
export class ProfileController {
    private profileService: ProfileService;

    constructor() {
        this.profileService = new ProfileService();
    }

    @Get('/')
    async getAll(@Res() response: Response) {
        const profiles = await this.profileService.getAllProfiles();
        return response.json(profiles);
    }

    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
        const profile = await this.profileService.getProfileById(id);
        if (!profile) {
            return response.status(404).json({ message: 'Profile not found' });
        }
        return response.json(profile);
    }

    @Post('/')
    async create(@Body() profileData: CreateProfileDto, @Res() response: Response) {
        try {
            const profile = await this.profileService.createProfile(profileData);
            return response.status(201).json(profile);
        } catch (error) {
            console.error('Error creating profile:', error);
            return response.status(500).json({ message: 'Error creating profile', error });
        }
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() profileData: CreateProfileDto, @Res() response: Response) {
        try {
            const profile = await this.profileService.updateProfile(id, profileData);
            return response.json(profile);
        } catch (error) {
            console.error('Error updating profile:', error);
            return response.status(500).json({ message: 'Error updating profile', error });
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @Res() response: Response) {
        try {
            const profile = await this.profileService.deleteProfile(id);
            return response.json(profile);
        } catch (error) {
            console.error('Error deleting profile:', error);
            return response.status(500).json({ message: 'Error deleting profile', error });
        }
    }
}
