import { HttpResponse, HttpRequest, IController } from "../protocols";
import { User } from "@prisma/client";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import validator from "validator";
import { badRequest, created, serverError } from "../helpers";

export class CreateUserController implements IController {
    constructor(private readonly createUserRepository: ICreateUserRepository) {}

    async handle(
        HttpRequest: HttpRequest<CreateUserParams>
    ): Promise<HttpResponse<User | string>> {
        try {
            const requiredFields = ["name", "email", "password"];

            for (const field of requiredFields) {
                if (
                    !HttpRequest?.body?.[field as keyof CreateUserParams]
                        ?.length
                ) {
                    return badRequest(
                        `Field ${field} is required!`
                    ) as HttpResponse<string>;
                }
            }

            const emailIsValid = validator.isEmail(HttpRequest.body!.email);

            if (!emailIsValid) {
                return badRequest("Invalid email!") as HttpResponse<string>;
            }

            if (!HttpRequest.body) {
                return badRequest(
                    "Please specify a body!"
                ) as HttpResponse<string>;
            }

            const user = await this.createUserRepository.createUser(
                HttpRequest.body!
            );

            return created(user) as HttpResponse<User>;
        } catch (error) {
            return serverError() as HttpResponse<string>;
        }
    }
}
