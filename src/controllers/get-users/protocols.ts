import { User } from "@prisma/client";

export interface IGetUserRepository {
    getUsers(): Promise<UserWithoutId[]>;
}

export type UserWithoutId = Omit<User, "id" | "password">;
