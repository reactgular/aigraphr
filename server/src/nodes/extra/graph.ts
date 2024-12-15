export interface Graph {
    findNode(cb: (n: Node) => boolean): Node | undefined;

    forEachNode(cb: (n: Node) => void): void;

    getNode(id: string): Node | undefined;

    hasNode(id: string): boolean;
}
