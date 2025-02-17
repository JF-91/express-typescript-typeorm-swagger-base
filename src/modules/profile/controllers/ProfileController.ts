import { JsonController, Get, Post, Put, Delete, Param, Body, Res } from 'routing-controllers';
import { Response } from 'express';
import { Inject } from 'typedi';
import { CreateProfileDto } from '../dtos/CreateProfileDto';
import ProfileService from '../services/ProfileService';

/**
 * @swagger
 * /api/profiles:
 *   get:
 *     summary: Get all profiles
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: List of profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 */
@JsonController('/profiles')
export class ProfileController {
    constructor(
        @Inject() private profileService: ProfileService
    ) {}

    @Get('/')
    async getAll(@Res() response: Response) {
        const profiles = await this.profileService.getAllProfiles();
        return response.json(profiles);
    }

    /**
     * @swagger
     * /api/profiles/{id}:
     *   get:
     *     summary: Get a profile by ID
     *     tags: [Profiles]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Profile found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ProfileResponse'
     *       404:
     *         description: Profile not found
     */
    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
        const profile = await this.profileService.getProfileById(id);
        if (!profile) {
            return response.status(404).json({ message: 'Profile not found' });
        }
        return response.json(profile);
    }

    /**
     * @swagger
     * /api/profiles:
     *   post:
     *     summary: Create a new profile
     *     tags: [Profiles]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateProfileDto'
     *     responses:
     *       201:
     *         description: Profile created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ProfileResponse'
     *       400:
     *         description: Invalid input data
     *       404:
     *         description: User not found
     */
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

    /**
     * @swagger
     * /api/profiles/{id}:
     *   put:
     *     summary: Update a profile
     *     tags: [Profiles]
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
     *             $ref: '#/components/schemas/UpdateProfileDto'
     *     responses:
     *       200:
     *         description: Profile updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ProfileResponse'
     *       404:
     *         description: Profile not found
     */
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

    /**
     * @swagger
     * /api/profiles/{id}:
     *   delete:
     *     summary: Delete a profile
     *     tags: [Profiles]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Profile deleted successfully
     *       404:
     *         description: Profile not found
     */
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
