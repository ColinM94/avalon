import { PersistOptions } from "zustand/middleware";

export type ZustandSet<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined
) => void;

export interface ZustandConfig<T>
  extends Omit<PersistOptions<T>, "partialize"> {
  name: string;
  data: (set: SetStoreState<T>, get: GetStoreState<T>) => T;
  /** Store state in local storage */
  persistState?: boolean;
  // partialize?: (state: T) => Partial<T>;
  storageType?: "localStorage" | "sessionStorage" | "indexedDB";
}

export type SetStoreState<T> = (
  partial: T | Partial<T>,
  replace?: boolean | undefined
) => void;
export type GetStoreState<T> = () => T;
