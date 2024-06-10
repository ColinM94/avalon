import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "inits/firebase";
import { FirestoreCollection } from "types";

interface Config<T> {
  collection: FirestoreCollection;
  data: Omit<T, "id">;
}

export const addDocument = async <T>(config: Config<T>) => {
  try {
    const document = doc(collection(db, config.collection));

    await setDoc(document, {
      ...config.data,
      id: document.id,
    });

    return document.id;
  } catch (error) {
    console.error(error, "addDocToCollection");
  }
};
