import { HttpResponse, HttpRequest, IController } from "../protocols";
import { User } from "@prisma/client";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import validator from "validator";

export class CreateUserController implements IController {
    constructor(private readonly createUserRepository: ICreateUserRepository) {}

    async handle(
        HttpRequest: HttpRequest<CreateUserParams>
    ): Promise<HttpResponse<User>> {
        try {
            const requiredFields = ["name", "email", "password"];

            for (const field of requiredFields) {
                if (
                    !HttpRequest?.body?.[field as keyof CreateUserParams]
                        ?.length
                ) {
                    return {
                        statusCode: 400,
                        body: `Field ${field} is required!`,
                    };
                }
            }

            const emailIsValid = validator.isEmail(HttpRequest.body!.email);

            if (!emailIsValid) {
                return {
                    statusCode: 400,
                    body: "Invalid email!",
                };
            }

            if (!HttpRequest.body) {
                return {
                    statusCode: 400,
                    body: "Please specify a body!",
                };
            }

            const user = await this.createUserRepository.createUser(
                HttpRequest.body!
            );

            return {
                statusCode: 201,
                body: user,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong",
            };
        }
    }
}
