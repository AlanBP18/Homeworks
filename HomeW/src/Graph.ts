class Graph<T extends string | number> {
  private nodes: T[];
  private adjList: Record<T, T[]>;

  constructor() {
    this.nodes = [];
    this.adjList = {} as Record<T, T[]>;
  }

  addNode(node: T): void {
    this.nodes.push(node);
    this.adjList[node] = [];
  }

  addEdge(node1: T, node2: T): void {
    if (this.adjList[node1] && this.adjList[node2]) {
      this.adjList[node1].push(node2);
      this.adjList[node2].push(node1);
    }
  }

  searchNode(node: T): T | undefined {
    if (!this.nodes.length) return undefined;
    return this.nodes.find((n) => n === node);
  }

  printAdjacency(node: T): void {
    if (this.searchNode(node)) {
      console.log(this.adjList[node]);
    }
  }

  printGraph(): void {
    console.log(this.adjList);
  }

  getNodes(): T[] {
    return this.nodes;
  }

  getAdjacencyList(): Record<T, T[]> {
    return this.adjList;
  }
}

export default Graph;