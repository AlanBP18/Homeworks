export class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList<T> {
    head: ListNode<T> | null;
    tail: ListNode<T> | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(value: T) {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            if (this.tail) {
                this.tail.next = newNode;
            }
            this.tail = newNode;
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
