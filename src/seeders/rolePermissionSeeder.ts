import prisma from '../services/prisma';

async function createRolesAndPermissions() {
    const permissions = [
        { name: 'CREATE_USER' },
        { name: 'READ_USER' },
        { name: 'UPDATE_USER' },
        { name: 'DELETE_USER' },
    ];

    const createdPermissions = await prisma.permission.createMany({
        data: permissions,
        skipDuplicates: true,
    });

    const adminRole = await prisma.role.create({
        data: {
            name: 'Admin',
            permissions: {
                connect: permissions.map(permission => ({ name: permission.name })),
            },
        },
    });

    console.log('Roles and permissions created:', { adminRole, createdPermissions });
}

createRolesAndPermissions()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
