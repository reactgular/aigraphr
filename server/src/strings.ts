/**
 * "document_id" -> "document id"
 * "documentId" -> "document id"
 */
export const toSpaces = (str: string): string =>
    str && str.replace(/[-_]/g, ' ').replace(/([A-Z])/g, ' $1');

/**
 * "Hello World" -> "hello_world"
 */
export const toSnakeCase = (str: string): string =>
    str &&
    str
        .match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )!
        .map((x) => x.toLowerCase())
        .join('_');

/**
 * "Hello World" -> "hello-world"
 */
export const toKebabCase = (str: string): string =>
    str &&
    str
        .match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )!
        .map((x) => x.toLowerCase())
        .join('-');

/**
 * "Hello World" -> "helloWorld"
 */
export const toCamelCase = (str: string): string =>
    str &&
    str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase());

/**
 * "camelCase" -> "Camelcase"
 * "Hello World" -> "Hello World"
 * "Hello_world" -> "Hello_world"
 */
export const toPascalCase = (str: string): string =>
    str &&
    str.replace(
        /\w\S*/g,
        (m) => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase()
    );
