import { ref, uploadBytes, UploadMetadata } from "firebase/storage";
import { storage } from "inits/firebase";

/** Uploads a file to Firebase Storage.
 *
 * @param file The file to be uploaded.
 * @param path The path of the file in Storage. e.g. images/games/bubble-woods/logo.png
 * @returns Boolean indicating if successful or not.
 */
export const uploadFile = async (
  file: File,
  path: string,
  metadata?: UploadMetadata
) => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file, metadata);
    return true;
  } catch (error) {
    reportError(error);
    return false;
  }
};
