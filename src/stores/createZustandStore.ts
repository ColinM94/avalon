import { create } from "zustand";
import {
  PersistOptions,
  PersistStorage,
  createJSONStorage,
  persist,
} from "zustand/middleware";
import { getStoreData, removeStoreData, setStoreData } from "./persistStorage";
import { ZustandConfig } from "./types";

export const createZustandStore = <T>(config: ZustandConfig<T>) => {
  const { name, data, persistState, storageType, ...rest } = config;

  if (!persistState) {
    const store = create<T>((set, get) => data(set, get));
    return store;
  }

  const storage = (): PersistStorage<T> | undefined => {
    if (storageType === "indexedDB") {
      const indexedDb: PersistStorage<T> = {
        setItem: (key, value) => setStoreData<T>(key, value),
        getItem: (key) => getStoreData<T>(key),
        removeItem: (key) => removeStoreData(key),
      };

      return indexedDb;
    }

    if (storageType === "sessionStorage") {
      return createJSONStorage(() => sessionStorage);
    }

    return createJSONStorage(() => localStorage);
  };

  const persistOptions: PersistOptions<T> = {
    name: name,
    storage: storage(),
    ...rest,
  };

  const store = create(persist((set, get) => data(set, get), persistOptions));
  return store;
};
