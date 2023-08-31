export const ok = (body: unknown) => ({
    statusCode: 200,
    body,
});

export const created = (body: unknown) => ({
    statusCode: 201,
    body,
});

export const badRequest = (body: unknown) => ({
    statusCode: 400,
    body,
});

export const serverError = () => ({
    statusCode: 500,
});
