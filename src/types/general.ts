/** Includes keys of all nested objects. */
export type KeyOf<T> = {
  [K in keyof T & (string | number)]: T[K] extends object
    ? `${K}` | `${K}.${KeyOf<T[K]>}`
    : `${K}`;
}[keyof T & (string | number)];
