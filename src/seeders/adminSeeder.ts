import prisma from '../services/prisma';
import bcrypt from 'bcrypt';

async function createAdminUser() {
    const hashedPassword = await bcrypt.hash('secret', 10);

    const adminRole = await prisma.role.findUnique({
        where: { name: 'Admin' },
    });

    if (!adminRole) {
        throw new Error('Admin role not found. Please run the rolePermissionSeeder first.');
    }

    const adminUser = await prisma.user.create({
        data: {
            email: 'john@mail.com',
            name: 'John',
            password: hashedPassword,
            roleId: adminRole.id,
        },
    });

    console.log('Admin user created:', adminUser);
}

createAdminUser()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
