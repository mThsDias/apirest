import { User } from "@prisma/client";

export interface IDeleteUserController {
    deleteUser(id: string): Promise<User>;
}
