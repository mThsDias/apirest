import { IGetUserRepository } from "../../controllers/get-users/protocols";
import { User } from "@prisma/client";
import { prismaClient } from "../../database/prisma-client";

export class PrismaGetUsersRepository implements IGetUserRepository {
    async getUsers(): Promise<User[]> {
        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        });

        return users;
    }
}
