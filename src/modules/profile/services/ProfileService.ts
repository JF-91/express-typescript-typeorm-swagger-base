import { CreateProfileDto } from '../dtos/CreateProfileDto';
import { IProfile } from '../interfaces/IProfile';
import prisma from '@services/prisma';

class ProfileService {
    async getAllProfiles(): Promise<IProfile[]> {
        return prisma.profile.findMany();
    }

    async getProfileById(id: number): Promise<IProfile | null> {
        return prisma.profile.findUnique({ where: { id } });
    }

    async createProfile(profileData: CreateProfileDto): Promise<IProfile> {
        return prisma.profile.create({ data: profileData });
    }

    async updateProfile(id: number, profileData: CreateProfileDto): Promise<IProfile> {
        return prisma.profile.update({
            where: { id },
            data: profileData,
        });
    }

    async deleteProfile(id: number): Promise<IProfile> {
        return prisma.profile.delete({ where: { id } });
    }
}

export default ProfileService;
