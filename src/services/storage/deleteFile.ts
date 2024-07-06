import { deleteObject, ref } from "firebase/storage";
import { storage } from "inits/firebase";

/** Deletes a file from Firebase Storage.
 *
 * @param file The file to be deleted.
 * @param path The path of the file in Storage. e.g. images/games/bubble-woods/logo.png
 * @returns Boolean indicating if successful or not.
 */
export const deleteFile = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    reportError(error);
    return false;
  }
};
