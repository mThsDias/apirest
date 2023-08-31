import { User } from "@prisma/client";

export interface UpdateUserParams {
    name?: string;
    password?: string;
}

export interface IUpdateUserRepository {
    updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
