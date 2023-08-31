export interface HttpResponse<T> {
    statusCode: number;
    body: T;
}

export interface HttpRequest<B> {
    params?: unknown;
    headers?: unknown;
    body?: B;
}

export interface IController {
    handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
