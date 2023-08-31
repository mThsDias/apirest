import { HttpResponse, IController } from "../protocols";
import { User } from "@prisma/client";
import { IGetUserRepository } from "./protocols";
import { ok, serverError } from "../helpers";

export class GetUsersController implements IController {
    constructor(private readonly getUsersRepository: IGetUserRepository) {}

    async handle(): Promise<HttpResponse<User[] | string>> {
        try {
            const users = await this.getUsersRepository.getUsers();

            return ok(users);
        } catch (error) {
            return serverError();
        }
    }
}
