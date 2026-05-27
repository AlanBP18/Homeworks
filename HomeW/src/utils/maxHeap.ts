export interface HeapItem {
  cantReproducciones: number;
}

export class MaxHeap<T extends HeapItem> {
  private heap: T[] = [];

  constructor(items?: T[]) {
    if (items) {
      this.heap = [...items];
      this.buildHeap();
    }
  }

  private getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  private getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  private getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  private swap(indexOne: number, indexTwo: number): void {
    const temp = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo];
    this.heap[indexTwo] = temp;
  }

  public size(): number {
    return this.heap.length;
  }

  public peek(): T | null {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  public insert(item: T): void {
    this.heap.push(item);
    this.heapifyUp();
  }

  public extractMax(): T | null {
    if (this.heap.length === 0) return null;
    const item = this.heap[0];
    const lastItem = this.heap.pop();
    if (this.heap.length > 0 && lastItem !== undefined) {
      this.heap[0] = lastItem;
      this.heapifyDown();
    }
    return item;
  }

  private buildHeap(): void {
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapifyDownFromIndex(i);
    }
  }

  private heapifyUp(): void {
    let index = this.heap.length - 1;
    while (
      index > 0 &&
      this.heap[this.getParentIndex(index)].cantReproducciones < this.heap[index].cantReproducciones
    ) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  private heapifyDown(): void {
    this.heapifyDownFromIndex(0);
  }

  private heapifyDownFromIndex(index: number): void {
    let largest = index;
    const left = this.getLeftChildIndex(index);
    const right = this.getRightChildIndex(index);
    const size = this.heap.length;

    if (left < size && this.heap[left].cantReproducciones > this.heap[largest].cantReproducciones) {
      largest = left;
    }

    if (right < size && this.heap[right].cantReproducciones > this.heap[largest].cantReproducciones) {
      largest = right;
    }

    if (largest !== index) {
      this.swap(index, largest);
      this.heapifyDownFromIndex(largest);
    }
  }
}
