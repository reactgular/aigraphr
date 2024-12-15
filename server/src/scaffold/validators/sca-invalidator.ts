export interface ScaInvalidator<TDto extends object> {
    badValue(name: keyof TDto, message?: string): void;

    format(name: keyof TDto, message?: string): void;

    invalid(name: keyof TDto, message?: string): void;

    notFound(name: keyof TDto, message?: string): void;

    notUnique(name: keyof TDto, message?: string): void;

    required(name: keyof TDto, message?: string): void;
}
