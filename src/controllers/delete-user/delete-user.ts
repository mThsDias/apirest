import { ok, serverError } from "../helpers";
import { badRequest } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";
import { User } from "@prisma/client";

export class DeleteUserController implements IController {
    constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
    async handle(
        httpRequest: HttpRequest<any>
    ): Promise<HttpResponse<User | string>> {
        try {
            const { id } = httpRequest.params as { id: string };

            if (!id) {
                return badRequest("Missing param: id");
            }

            await this.deleteUserRepository.deleteUser(id);

            return ok("User deleted successfully");
        } catch (error) {
            return serverError();
        }
    }
}
