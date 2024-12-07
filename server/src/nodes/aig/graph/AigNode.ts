// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type InputToken = string | number | symbol | Function;

export interface InputType<TType> {
    provide: InputToken;
}

export type GrNodeData = {id: string};

export class AigNode<TData extends GrNodeData> {
    private _data: TData;

    public constructor(data: TData) {
        this._data = Object.freeze(data);
    }

    public get id(): string {
        return this._data.id;
    }
}
