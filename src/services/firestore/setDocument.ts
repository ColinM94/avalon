import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "inits/firebase";
import { FirestoreCollection } from "types";

interface Config<T> {
  collection: FirestoreCollection;
  data: Partial<T>;
  merge?: boolean;
  id?: string;
}

export const setDocument = async <T>(config: Config<T>) => {
  try {
    const collectionRef = collection(db, config.collection);

    const docRef = doc(collectionRef, config.id);

    await setDoc(docRef, config.data, { merge: config.merge });

    return true;
  } catch (error) {
    console.error(error, `setDocument ${config.id} ${config.data}`);
    return false;
  }
};
