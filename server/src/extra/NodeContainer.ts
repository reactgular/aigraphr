export interface NodeContainer {
    each(cb: (n: Node) => void): void;

    find(cb: (n: Node) => boolean): Node | undefined;

    filter(cb: (n: Node) => boolean): Node[];

    map(cb: (n: Node) => Node): NodeContainer;

    reduce<T>(cb: (acc: T, n: Node) => T, initial: T): T;

    some(cb: (n: Node) => boolean): boolean;

    every(cb: (n: Node) => boolean): boolean;

    get(id: string): Node | undefined;

    has(...ids: string[]): boolean;

    has(...nodes: Node[]): boolean;

    add(n: Node): void;

    remove(id: string): void;

    addConstraint(c: Constraint): void;

    removeConstraint(c: Constraint): void;

    validate(): boolean;
}

export interface Constraint {
    id: string;
    name: string;
}
