import HttpRequest, { HttpResponse } from "../protocols";
import { User } from "@prisma/client";
import {
    CreateUserParams,
    ICreateUserController,
    ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
    constructor(private readonly createUserRepository: ICreateUserRepository) {}

    async handle(
        HttpRequest: HttpRequest<CreateUserParams>
    ): Promise<HttpResponse<User>> {
        try {
            if (!HttpRequest.body) {
                return {
                    statusCode: 400,
                    body: "Missing body",
                };
            }

            const user = await this.createUserRepository.createUser(
                HttpRequest.body
            );

            return {
                statusCode: 201,
                body: user,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong",
            };
        }
    }
}
