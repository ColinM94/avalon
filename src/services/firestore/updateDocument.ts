import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "inits/firebase";
import { FirestoreCollection } from "types";

interface Config<T> {
  collection: FirestoreCollection;
  data: Partial<T>;
  id: string;
}

export const updateDocument = async <T>(config: Config<T>) => {
  console.log("updateDocument");
  try {
    const collectionRef = collection(db, config.collection);

    const docRef = doc(collectionRef, config.id);

    await updateDoc(docRef, config.data as any);

    return true;
  } catch (error) {
    console.error(error, `updateDocument ${config.id} ${config.data}`);
    return false;
  }
};
