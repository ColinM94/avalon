import { doc, collection } from "firebase/firestore";
import { db } from "inits/firebase";

export const getDocumentRef = (collectionName: string) => {
  console.log("getDocumentRef");

  try {
    const collectionRef = collection(db, collectionName);

    const docRef = doc(collectionRef);

    return docRef;
  } catch (error) {
    console.error(error, "getDocRef");
    return undefined;
  }
};
