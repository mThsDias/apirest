export const ok = (body: any) => ({
    statusCode: 200,
    body,
});

export const created = (body: any) => ({
    statusCode: 201,
    body,
});

export const badRequest = (body: any) => ({
    statusCode: 400,
    body,
});

export const serverError = () => ({
    statusCode: 500,
    body: "Something went wrong",
});
