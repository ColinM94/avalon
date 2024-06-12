import { StorageValue } from 'zustand/middleware';

const getDbConnection = async (store: string) => {
  const connection = indexedDB.open('h5GamesDb', 4);

  return new Promise<IDBDatabase>((resolve) => {
    connection.onsuccess = () => {
      resolve(connection.result);
    };

    connection.onupgradeneeded = () => {
      const db = connection.result;

      if (!db.objectStoreNames.contains(store)) {
        db.createObjectStore(store);
      }
    };
  });
};

export const setStoreData = async <T>(store: string, data: StorageValue<T>) => {
  const db = await getDbConnection(store);

  const request: IDBRequest = db
    .transaction(store, 'readwrite')
    .objectStore(store)
    .put(JSON.stringify(data), data.version);

  return new Promise<void>((resolve) => {
    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (error) => {
      reportError(error);
    };
  });
};

export const getStoreData = async <T>(store: string) => {
  const db = await getDbConnection(store);

  const request: IDBRequest = db.transaction(store, 'readwrite').objectStore(store).get(0);

  return new Promise<StorageValue<T>>((resolve) => {
    request.onsuccess = () => {
      resolve(request.result ? JSON.parse(request.result) : undefined);
    };

    request.onerror = (error) => {
      reportError(error);
    };
  });
};

export const removeStoreData = async (store: string) => {
  const db = await getDbConnection(store);

  const request: IDBRequest = db.transaction(store, 'readwrite').objectStore(store).clear();

  return new Promise<void>((resolve) => {
    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (error) => {
      reportError(error);
    };
  });
};
