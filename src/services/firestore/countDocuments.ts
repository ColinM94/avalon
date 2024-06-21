import {
  QueryConstraint,
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { db } from "inits/firebase";
import { FirestoreCollection, FirestoreWhereGeneric } from "types";

interface Config<T> {
  collection: FirestoreCollection;
  where?: FirestoreWhereGeneric<T>[];
}

export const countDocuments = async <T>(config: Config<T>) => {
  try {
    const { collection: collectionName, where: whereClauses } = config;

    const conditions: QueryConstraint[] = [];

    whereClauses?.forEach((whereClause) => {
      if (!whereClause) return;
      const newWhere = where(whereClause[0], whereClause[1], whereClause[2]);
      conditions.push(newWhere);
    });

    const q = query(collection(db, collectionName), ...conditions);
    const snapshot = await getCountFromServer(q);

    return snapshot.data().count || 0;
  } catch (error) {
    console.error(error, `countDocuments`);
    return 0;
  }
};
