import { IDeleteUserController } from "../../controllers/delete-user/protocols";
import { User } from "@prisma/client";
import { prismaClient } from "../../database/prisma-client";

export class PrismaDeleteUserRepository implements IDeleteUserController {
    async deleteUser(id: string): Promise<User> {
        const user = await prismaClient.user.delete({
            where: { id },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
}
