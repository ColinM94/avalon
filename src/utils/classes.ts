/**
 * Combines sass class names into one string.
 * @params Each class name is a param.
 * @returns String of classes combined.
 */
export const classes = (...items: (string | false | undefined)[]) => {
  items.filter((item) => item);
  return items.join(' ');
};
