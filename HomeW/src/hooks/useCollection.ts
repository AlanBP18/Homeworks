import { useCallback, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  type DocumentData,
  type WhereFilterOp,
  getDoc,
  setDoc,
} from "firebase/firestore";

export type Filter = [string, WhereFilterOp, unknown];

export const useCollection = <T>(table: string) => {
  type Doc<T> = {
    id: string;
  } & T;

  const [results, setResults] = useState<Doc<T>[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const getAll = useCallback(async (filters: Filter[] = []): Promise<Doc<T>[]> => {
    setIsPending(true);
    setError(null);

    try {
      let q = query(collection(db, table));


      filters.forEach(([field, op, value]) => {
        q = query(q, where(field, op, value));
      });


      const snapshot = await getDocs(q);

      const docs: Doc<T>[] = snapshot.docs.map((d) => ({
        id: d.id, 
        ...(d.data() as T),
      }));

      // Actualizar estados
      setResults(docs);
      setIsPending(false);
      return docs;
    } catch {
      setError(
        `Error al consultar los registros solicitados de la colección ${table}`,
      );
      setIsPending(false);
      return [];
    }
  }, [table]);

  const getById = useCallback(async (id: string): Promise<Doc<T> | null> => {
    setIsPending(true);
    setError(null);

    try {
      const docRef = doc(db, table, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const result: Doc<T> = {
          id: docSnap.id,
          ...(docSnap.data() as T),
        };

        setIsPending(false);
        return result;
      } else {
        setIsPending(false);
        return null;
      }
    } catch {
      setIsPending(false);
      setError(
        `Error al obtener el registro solcitado de la colección ${table}`,
      );
      return null;
    }
  }, [table]);

  const add = useCallback(async (data: T): Promise<string | null> => {
    setIsPending(true);
    setError(null);

    try {
      const ref = await addDoc(collection(db, table), {
        ...data,
        createdAt: serverTimestamp(),
      } as DocumentData);

      setIsPending(false);
      return ref.id; 
    } catch {
      setIsPending(false);
      setError(`Error al agregar un nuevo registro en la colección ${table}`);
      return null;
    }
  }, [table]);

  const setById = useCallback(async (id: string, data: T): Promise<boolean> => {
    setIsPending(true);
    setError(null);

    try {
      const docRef = doc(db, table, id);

      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
      });

      setIsPending(false);
      return true;
    } catch {
      setError(`Error al crear el documento en ${table} con id ${id}`);
      setIsPending(false);
      return false;
    }
  }, [table]);

  const update = useCallback(async (id: string, data: DocumentData) => {
    setIsPending(true);
    setError(null);

    try {
      await updateDoc(doc(db, table, id), {
        ...data,
        updatedAt: serverTimestamp(),
      });

      setIsPending(false);
      return true;
    } catch {
      setIsPending(false);
      setError(
        `Error al actualizar el registro solicitado de la colección ${table}`,
      );
      return false;
    }
  }, [table]);

  //* 4. D -> DELETE
  const remove = useCallback(async (id: string) => {
    setIsPending(true);
    setError(null);

    try {
      await deleteDoc(doc(db, table, id));
      setIsPending(false);
      return true;
    } catch {
      setError(
        `Error al eliminar el registro solicitado de la colección ${table}`,
      );
      setIsPending(false);
      return false;
    }
  }, [table]);

  return {
    results,
    isPending,
    error,
    getAll,
    getById,
    add,
    setById,
    update,
    remove,
  };
};
