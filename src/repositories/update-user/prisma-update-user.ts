import {
    IUpdateUserRepository,
    UpdateUserParams,
} from "../../controllers/update-user/protocols";
import { User } from "@prisma/client";
import { prismaClient } from "../../database/prisma-client";

export class PrismaUpdateUserRepository implements IUpdateUserRepository {
    async updateUser(id: string, params: UpdateUserParams): Promise<User> {
        await prismaClient.user.update({
            where: { id },
            data: params,
        });

        const user = await prismaClient.user.findUnique({
            where: { id },
        });

        if (!user) throw new Error("User not found");

        return user;
    }
}
