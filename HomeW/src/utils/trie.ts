class TrieNode {
  children: Record<string, TrieNode> = {};
  songIds: Set<string> = new Set();
  isEndOfWord: boolean = false;
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string, songId: string) {
    let current = this.root;
    word = word.toLowerCase();
    for (const char of word) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
      current.songIds.add(songId);
    }
    current.isEndOfWord = true;
  }

  insertPhrase(phrase: string, songId: string) {
    this.insert(phrase, songId);
    
    const words = phrase.split(/\s+/);
    if (words.length > 1) {
      for (const word of words) {
        this.insert(word, songId);
      }
    }
  }

  searchPrefix(prefix: string): string[] {
    if (!prefix) return [];
    
    let current = this.root;
    prefix = prefix.toLowerCase();
    for (const char of prefix) {
      if (!current.children[char]) {
        return [];
      }
      current = current.children[char];
    }
    return Array.from(current.songIds);
  }
}
