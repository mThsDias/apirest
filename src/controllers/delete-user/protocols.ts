import { User } from "@prisma/client";

export interface IDeleteUserRepository {
    deleteUser(id: string): Promise<User>;
}
