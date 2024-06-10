import {
  query,
  where,
  collection,
  QueryConstraint,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "inits/firebase";
import {
  FirestoreCollection,
  FirestoreOrderByGeneric,
  FirestoreWhereGeneric,
} from "types/firebase";

interface Config<T> {
  collection: FirestoreCollection;
  /** Array of where clauses e.g. ["userId", "==", "12345", "userId", "==", "54321"] */
  where?: FirestoreWhereGeneric<T>[] | undefined;
  orderBy?: FirestoreOrderByGeneric<T>[];
  callback: (data: T[]) => void;
  limit?: number;
}

export const getDocumentsSnapshot = <T>(config: Config<T>) => {
  const {
    collection: collectionName,
    where: whereClauses,
    orderBy: orderByClauses,
    limit: limitAmount,
  } = config;

  try {
    const conditions: QueryConstraint[] = [];

    whereClauses?.forEach((whereClause) => {
      if (!whereClause) return;

      const newWhere = where(whereClause[0], whereClause[1], whereClause[2]);
      conditions.push(newWhere);
    });

    orderByClauses?.forEach((orderByClause) => {
      const newOrderBy = orderBy(orderByClause[0], orderByClause[1]);
      conditions.push(newOrderBy);
    });

    let q;

    if (limitAmount) {
      q = query(
        collection(db, collectionName),
        ...conditions,
        limit(limitAmount)
      );
    } else {
      q = query(collection(db, collectionName), ...conditions);
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items: T[] = [];

      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id } as T);
      });

      config.callback(items);
    });

    return unsubscribe;
  } catch (error) {
    console.error(error, "getDocumentsSnapshot");
  }
};
