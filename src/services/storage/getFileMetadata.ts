import { getMetadata, ref } from "firebase/storage";
import { storage } from "inits/firebase";

export const getFileMetadata = async (path: string) => {
  try {
    const storageRef = ref(storage, path);

    const metadata = await getMetadata(storageRef);
    return metadata;
  } catch (error) {
    // reportError(error, 'getFileMetadata');
  }
};
