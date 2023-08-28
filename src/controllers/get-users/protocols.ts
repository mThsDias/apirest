import { HttpResponse } from "../protocols";
import { User } from "@prisma/client";

export interface IGetUserController {
    handle(): Promise<HttpResponse<User[]>>;
}

export interface IGetUserRepository {
    getUsers(): Promise<User[]>;
}
