import { User } from "@prisma/client";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { UpdateUserParams, IUpdateUserRepository } from "./protocols";
import { badRequest, ok, serverError } from "../helpers";

export class UpdateUserController implements IController {
    constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
    async handle(
        httpRequest: HttpRequest<UpdateUserParams>
    ): Promise<HttpResponse<User | string>> {
        try {
            const { id } = httpRequest?.params as { id: string };
            const body = httpRequest?.body as UpdateUserParams;

            if (!id) {
                return badRequest("Missing user id.") as HttpResponse<string>;
            }

            const allowedFields: (keyof UpdateUserParams)[] = [
                "name",
                "password",
            ];
            const someFieldIsNotAllow = Object.keys(body).some(
                (key) => !allowedFields.includes(key as keyof UpdateUserParams)
            );

            if (someFieldIsNotAllow) {
                return badRequest(
                    "Some field is not allowed."
                ) as HttpResponse<string>;
            }

            const user = await this.updateUserRepository.updateUser(id, body);

            return ok(user) as HttpResponse<User>;
        } catch (error) {
            return serverError() as HttpResponse<string>;
        }
    }
}
