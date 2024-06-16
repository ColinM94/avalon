import { doc, onSnapshot } from "firebase/firestore";
import { db } from "inits/firebase";
import { FirestoreCollection } from "types/firebase";

interface Config<T> {
  collection: FirestoreCollection;
  id: string;
  callback: (data: T | undefined) => void;
}

export const getDocumentSnapshot = <T>(config: Config<T>) => {
  console.log("getDocumentsSnapshot");

  try {
    const docRef = doc(db, config.collection, config.id);

    const unsubscribe = onSnapshot(docRef, (document) => {
      console.log("getDocumentsSnapshot: onSnapshot");

      const data = { ...document.data(), id: document.id } as T;

      if (document.exists()) {
        config.callback(data);
      } else {
        config.callback(undefined);
      }
    });

    return unsubscribe;
  } catch (error) {
    console.error(error, "getDocumentSnapshot");
  }
};
