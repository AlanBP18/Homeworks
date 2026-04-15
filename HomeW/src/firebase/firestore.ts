import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './config';
import type { FileStructure } from '../Tree/FileStructure';

const TREE_COLLECTION = 'trees';
const DEFAULT_DOC_ID = 'misCarpetas';

export async function loadTree(docId = DEFAULT_DOC_ID): Promise<FileStructure | null> {
  const ref = doc(db, TREE_COLLECTION, docId);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as FileStructure;
}

export async function saveTree(tree: FileStructure, docId = DEFAULT_DOC_ID): Promise<void> {
  const ref = doc(db, TREE_COLLECTION, docId);
  await setDoc(ref, tree, { merge: true });
}

export function subscribeTree(
  callback: (tree: FileStructure | null) => void,
  docId = DEFAULT_DOC_ID,
): () => void {
  const ref = doc(db, TREE_COLLECTION, docId);
  const unsubscribe = onSnapshot(ref, (snapshot) => {
    callback(snapshot.exists() ? (snapshot.data() as FileStructure) : null);
  });

  return () => unsubscribe();
}
