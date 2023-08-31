import { Router } from "express";
import { PrismaGetUsersRepository } from "../repositories/get-users/get-users";
import { GetUsersController } from "../controllers/get-users/get-users";
import { PrismaCreateUser } from "../repositories/create-user/prisma-create-user";
import { CreateUserController } from "../controllers/create-user/create-user";
import { PrismaUpdateUserRepository } from "../repositories/update-user/prisma-update-user";

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

userRoutes.put("/update", async (request, response) => {
    const updateUserRepository = new PrismaUpdateUserRepository();

    const updateUserController = new UpdateUserController(updateUserRepository);

    const { body, statusCode } = await updateUserController.handle({
        body: request.body,
    });

    response.status(statusCode).send(body);
});

export { userRoutes };
