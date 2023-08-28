import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

type User = PrismaClient["user"];

export { prismaClient, User };
