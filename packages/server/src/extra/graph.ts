export interface Graph {
  forEachNode(cb: (n: Node) => void): void;

  findNode(cb: (n: Node) => boolean): Node | undefined;

  getNode(id: string): Node | undefined;

  hasNode(id: string): boolean;
}
