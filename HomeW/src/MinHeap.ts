export class MinHeap<T> {
    private heap: T[];
    private compare: (a: T, b: T) => number;

    constructor(compare: (a: T, b: T) => number, initial: T[] = []) {
        this.heap = [];
        this.compare = compare;
        if (initial.length > 0) {
            this.heap = [...initial];
            this.heapify();
        }
    }

    push(value: T) {
        this.heap.push(value);
        this.percolateUp();
    }

    pop(): T | undefined {
        if (this.heap.length === 0) return undefined;
        const n = this.heap.length;
        this.swap(0, n - 1);
        const min = this.heap.pop();
        if (this.heap.length > 0) {
            this.percolateDown(0);
        }
        return min;
    }

    peek(): T | undefined {
        return this.heap[0];
    }

    private heapify() {
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.percolateDown(i);
        }
    }

    private percolateDown(index: number) {
        let curr = index;
        while (2 * curr + 1 < this.heap.length) {
            const left = 2 * curr + 1;
            const right = 2 * curr + 2;

            const minChild = right < this.heap.length && this.compare(this.heap[right], this.heap[left]) < 0
                ? right
                : left;

            if (this.compare(this.heap[minChild], this.heap[curr]) < 0) {
                this.swap(curr, minChild);
                curr = minChild;
            } else {
                break;
            }
        }
    }

    private percolateUp() {
        let curr = this.heap.length - 1;
        while (curr > 0) {
            const parent = Math.floor((curr - 1) / 2);
            if (this.compare(this.heap[curr], this.heap[parent]) < 0) {
                this.swap(curr, parent);
                curr = parent;
            } else {
                break;
            }
        }
    }

    private swap(i: number, j: number) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    size(): number {
        return this.heap.length;
    }

    toArray(): T[] {
        return [...this.heap];
    }
}
