import { Router } from "express";
import { PrismaGetUsersRepository } from "../repositories/get-users/prisma-get-users";
import { GetUsersController } from "../controllers/get-users/get-users";
import { PrismaCreateUser } from "../repositories/create-user/prisma-create-user";
import { CreateUserController } from "../controllers/create-user/create-user";
import { PrismaUpdateUserRepository } from "../repositories/update-user/prisma-update-user";
import { UpdateUserController } from "../controllers/update-user/update-user";
import { PrismaDeleteUserRepository } from "../repositories/delete-user/prisma-delete-user";
import { DeleteUserController } from "../controllers/delete-user/delete-user";

const userRoutes = Router();

userRoutes.get("/users", async (request, response) => {
    const getUsersRepository = new PrismaGetUsersRepository();

    const getUsersController = new GetUsersController(getUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    response.status(statusCode).send(body);
});

userRoutes.post("/create", async (request, response) => {
    const createUserRepository = new PrismaCreateUser();

    const createUserController = new CreateUserController(createUserRepository);

    const { body, statusCode } = await createUserController.handle({
        body: request.body,
    });

    response.status(statusCode).send(body);
});

userRoutes.patch("/update/:id", async (request, response) => {
    const updateUserRepository = new PrismaUpdateUserRepository();

    const updateUserController = new UpdateUserController(updateUserRepository);

    const { body, statusCode } = await updateUserController.handle({
        body: request.body,
        params: request.params,
    });

    response.status(statusCode).send(body);
});

userRoutes.delete("/delete/:id", async (request, response) => {
    const prismaDeleteUserRepository = new PrismaDeleteUserRepository();

    const deleteUserController = new DeleteUserController(
        prismaDeleteUserRepository
    );

    const { body, statusCode } = await deleteUserController.handle({
        params: request.params,
    });

    response.status(statusCode).send(body);
});

export { userRoutes };
