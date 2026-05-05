import { MinHeap } from './MinHeap';
import { Trie, TrieNode } from './Trie';
import type { Product } from './Trie';

export class SmartSearchEngine {
    private trie: Trie;

    constructor() {
        this.trie = new Trie();
    }

    insert(name: string, popularity: number) {
        this.trie.insert(name, popularity);
    }

    searchTopK(prefix: string, k: number): Product[] {
        const prefixNode = this.trie.findPrefixNode(prefix);
        if (!prefixNode) return [];

        const heap = new MinHeap<Product>((a, b) => a.popularity - b.popularity);

        const dfs = (node: TrieNode) => {
            if (node.isEndOfWord && node.product) {
                if (heap.size() < k) {
                    heap.push(node.product);
                } else {
                    const minProduct = heap.peek();
                    if (minProduct && node.product.popularity > minProduct.popularity) {
                        heap.pop();
                        heap.push(node.product);
                    }
                }
            }

            for (const childNode of node.children.values()) {
                dfs(childNode);
            }
        };

        dfs(prefixNode);

        const result: Product[] = [];
        while (heap.size() > 0) {
            result.push(heap.pop()!);
        }

        return result.reverse();
    }
}
