export interface HttpResponse<T> {
    statusCode: number;
    body: T | string;
}

export default interface HttpRequest<B> {
    params?: unknown;
    headers?: unknown;
    body: B;
}
