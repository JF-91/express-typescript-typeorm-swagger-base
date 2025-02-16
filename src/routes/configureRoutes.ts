import { Application } from 'express';
import { useExpressServer, RoutingControllersOptions } from 'routing-controllers';
import { UserController } from '@modules/user/controllers/UserController';
import { ProfileController } from '@modules/profile/controllers/ProfileController';
import { PageController } from '@modules/page/controllers/PageController';
import { RoleController } from '@modules/role/controllers/RoleController';
import { PermissionController } from '@modules/permission/controllers/PermissionController';
import { PostController } from '@modules/post/controllers/PostController';

export default function configureRoutes(app: Application) {
    const routingControllersOptions: RoutingControllersOptions = {
        controllers: [
            UserController,
            ProfileController,
            PageController,
            RoleController,
            PermissionController,
            PostController,
        ],
        middlewares: [`${__dirname}/../modules/shared/middlewares/**/*Middleware.ts`],
        interceptors: [`${__dirname}/../modules/shared/interceptors/**/*Interceptor.ts`],
        defaultErrorHandler: false,
        validation: {
            whitelist: true,
            forbidNonWhitelisted: true
        },
        cors: true
    };

    useExpressServer(app, routingControllersOptions);
}