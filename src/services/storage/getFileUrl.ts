import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "inits/firebase";

/**
 * Gets URL for file located at certain path.
 *
 * @param path The path of the file in Storage. e.g. images/games/bubble-woods/logo.png
 * @returns A url to this file.
 */
export const getFileUrl = async (path: string) => {
  // const store = useDownloadUrlStore.getState();

  try {
    // if (store.images[path]) {
    //   return store.images[path].url;
    // }

    const fileUrl = await getDownloadURL(ref(storage, path));

    // store.update(path, fileUrl);

    return fileUrl;
  } catch (error) {
    console.error(error);
  }
};
