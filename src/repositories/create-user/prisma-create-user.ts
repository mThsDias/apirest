import {
    CreateUserParams,
    ICreateUserRepository,
} from "../../controllers/create-user/protocols";
import { User } from "@prisma/client";
import { prismaClient } from "../../database/prisma-client";

export class PrismaCreateUser implements ICreateUserRepository {
    async createUser(params: CreateUserParams): Promise<User> {
        const { name, email, password } = params;

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password,
            },
        });

        if (!user) {
            throw new Error("User not created");
        }

        return user;
    }
}
