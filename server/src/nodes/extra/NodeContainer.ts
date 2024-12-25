export interface NodeContainer {
    add(n: Node): void;

    addConstraint(c: Constraint): void;

    each(cb: (n: Node) => void): void;

    every(cb: (n: Node) => boolean): boolean;

    filter(cb: (n: Node) => boolean): Node[];

    find(cb: (n: Node) => boolean): Node | undefined;

    get(id: string): Node | undefined;

    has(...ids: string[]): boolean;

    has(...nodes: Node[]): boolean;

    map(cb: (n: Node) => Node): NodeContainer;

    reduce<T>(cb: (acc: T, n: Node) => T, initial: T): T;

    remove(id: string): void;

    removeConstraint(c: Constraint): void;

    some(cb: (n: Node) => boolean): boolean;

    validate(): boolean;
}

export interface Constraint {
    id: string;
    name: string;
}
