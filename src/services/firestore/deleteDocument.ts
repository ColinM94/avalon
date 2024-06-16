import { deleteDoc, doc } from "firebase/firestore";
import { db } from "inits/firebase";
import { FirestoreCollection } from "types";

interface Config {
  collection: FirestoreCollection;
  id: string;
}

export const deleteDocument = async (config: Config) => {
  console.log("deleteDocument");

  try {
    await deleteDoc(doc(db, config.collection, config.id));
    return true;
  } catch (error) {
    console.error(
      error,
      `addDocToCollection ${config.collection} ${config.id}`
    );
    return false;
  }
};
