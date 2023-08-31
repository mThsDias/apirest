import { HttpRequest, HttpResponse } from "../protocols";
import { IDeleteUserController, IDeleteUserRepository } from "./protocols";
import { User } from "@prisma/client";

export class DeleteUserController implements IDeleteUserController {
    constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
        try {
            const { id } = httpRequest.params as { id: string };

            if (!id) {
                return {
                    statusCode: 400,
                    body: "Missing param: id",
                };
            }

            await this.deleteUserRepository.deleteUser(id);

            return {
                statusCode: 200,
                body: "User deleted successfully",
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong",
            };
        }
    }
}
