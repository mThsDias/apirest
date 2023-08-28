import { User } from "@prisma/client";

export interface CreateUserParams {
    name: string;
    email: string;
    password: string;
}

export interface ICreateUserRepository {
    createUser(params: CreateUserParams): Promise<User>;
}
