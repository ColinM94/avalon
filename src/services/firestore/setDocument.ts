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
    const shouldMerge = config.merge === undefined || config.merge === true;

    const collectionRef = collection(db, config.collection);

    // NOTE if config.id is undefined, will create a new document, and can't be sent as second argument undefined (why?).
    const docRef = config.id
      ? doc(collectionRef, config.id)
      : doc(collectionRef);

    await setDoc(docRef, config.data, { merge: shouldMerge });

    return true;
  } catch (error) {
    console.error(error, `setDocument ${config.id} ${config.data}`);
    return false;
  }
};
