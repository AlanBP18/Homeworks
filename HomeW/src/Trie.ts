export interface Product {
    name: string;
    popularity: number;
}

export class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;
    product: Product | null;

    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
        this.product = null;
    }
}

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(name: string, popularity: number) {
        let current = this.root;
        for (const char of name) {
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            current = current.children.get(char)!;
        }
        current.isEndOfWord = true;
        current.product = { name, popularity };
    }

    findPrefixNode(prefix: string): TrieNode | null {
        let current = this.root;
        for (const char of prefix) {
            if (!current.children.has(char)) {
                return null;
            }
            current = current.children.get(char)!;
        }
        return current;
    }
}
