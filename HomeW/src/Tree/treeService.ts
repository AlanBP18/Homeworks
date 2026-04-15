import type { FileStructure } from './FileStructure';
import { defaultTree } from './treeData';
import { loadTree, saveTree, subscribeTree } from '../firebase/firestore';

export async function getTree(docId = 'misCarpetas'): Promise<FileStructure> {
  try {
    const tree = await loadTree(docId);
    return tree ?? defaultTree;
  } catch (error) {
    return defaultTree;
  }
}

export async function persistTree(tree: FileStructure, docId = 'misCarpetas'): Promise<void> {
  await saveTree(tree, docId);
}

export function watchTree(callback: (tree: FileStructure | null) => void, docId = 'misCarpetas') {
  return subscribeTree(callback, docId);
}
