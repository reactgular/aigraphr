export class ExceptionFilterDto {
    statusCode: number;

    cause?: object;

    message: string;

    path: string;

    stack?: Array<string>;
}
