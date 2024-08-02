/**
 * Combines sass class names into one string.
 * @param items - Array of Class Names.
 * @returns String of classes combined.
 */
export const classes = (...items: (string | false | undefined)[]) => {
  items.filter((item) => item);
  return items.join(" ");
};
