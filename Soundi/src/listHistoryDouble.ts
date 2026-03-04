export class DoublyPAG<T> {
    value: T;
    next: DoublyPAG<T> | null;
    prev: DoublyPAG<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export class DoublyLinkedList<T> {
    head: DoublyPAG<T> | null;
    tail: DoublyPAG<T> | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(value: T) {
        const newPAG = new DoublyPAG(value);
        if (!this.head) {
            this.head = newPAG;
            this.tail = newPAG;
        } else {
            if (this.tail) {
                this.tail.next = newPAG;
                newPAG.prev = this.tail;
                this.tail = newPAG;
            }
        }
    }

    getArray(): T[] {
        const arr: T[] = [];
        let current = this.head;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }
}
