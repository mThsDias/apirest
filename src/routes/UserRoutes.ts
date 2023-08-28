import { Router } from "express";
import { PrimaGetUsersRepository } from "../repositories/get-users/get-users";
import { GetUsersController } from "../controllers/get-users/get-users";

const userRoutes = Router();

const getUsersRepository = new PrimaGetUsersRepository();

const getUsersController = new GetUsersController(getUsersRepository);

userRoutes.get("/users", async (request, response) => {
    const { body, statusCode } = await getUsersController.handle();

    response.send(body).status(statusCode);
});

export { userRoutes };
