export interface ScaConstructor<T = {}> {
    new (...args: any[]): T;
}

export class ScaEmptyBase {
    public constructor(...args: any[]) {}
}
