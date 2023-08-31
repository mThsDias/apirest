import { IUpdateUserController } from "./protocols";
import { User } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../protocols";
import { UpdateUserParams, IUpdateUserRepository } from "./protocols";

export class UpdateUserController implements IUpdateUserController {
    constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
    async handle(
        httpRequest: HttpRequest<UpdateUserParams>
    ): Promise<HttpResponse<User>> {
        try {
            const { id } = httpRequest?.params as { id: string };
            const body = httpRequest?.body as UpdateUserParams;

            if (!id) {
                return {
                    statusCode: 400,
                    body: "Missing param id",
                };
            }

            const allowedFields: (keyof UpdateUserParams)[] = [
                "name",
                "password",
            ];
            const someFieldIsNotAllow = Object.keys(body).some(
                (key) => !allowedFields.includes(key as keyof UpdateUserParams)
            );

            if (someFieldIsNotAllow) {
                return {
                    statusCode: 400,
                    body: "Some field is not allowed",
                };
            }

            const user = await this.updateUserRepository.updateUser(id, body);

            return {
                statusCode: 200,
                body: user,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: "Internal server error",
            };
        }
    }
}
