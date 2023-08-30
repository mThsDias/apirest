import {
    IGetUserRepository,
    UserWithoutId,
} from "../../controllers/get-users/protocols";
import { prismaClient } from "../../database/prisma-client";

export class PrismaGetUsersRepository implements IGetUserRepository {
    async getUsers(): Promise<UserWithoutId[]> {
        const users = await prismaClient.user.findMany({
            select: {
                name: true,
                email: true,
            },
        });

        return users;
    }
}
