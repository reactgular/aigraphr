/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ScaConstructor<T = object> {
    new (...args: any[]): T;
}

export class ScaEmptyBase {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(...args: any[]) {}
}
