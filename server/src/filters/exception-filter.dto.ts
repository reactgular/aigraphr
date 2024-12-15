export class ExceptionFilterDto {
    statusCode: number;

    message: string;

    path: string;

    stack?: Array<string>;
}
