import { User } from "@prisma/client";
import { HttpResponse, HttpRequest } from "../protocols";

export interface ICreateUserController {
    handle(
        HttpRequest: HttpRequest<CreateUserParams>
    ): Promise<HttpResponse<User>>;
}

export interface CreateUserParams {
    name: string;
    email: string;
    password: string;
}

export interface ICreateUserRepository {
    createUser(params: CreateUserParams): Promise<User>;
}
