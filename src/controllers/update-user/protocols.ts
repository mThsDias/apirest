import { User } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../protocols";

export interface UpdateUserParams {
    name?: string;
    password?: string;
}

export interface IUpdateUserRepository {
    updateUser(id: string, params: UpdateUserParams): Promise<User>;
}

export interface IUpdateUserController {
    handle(
        httpRequest: HttpRequest<UpdateUserParams>
    ): Promise<HttpResponse<User>>;
}
