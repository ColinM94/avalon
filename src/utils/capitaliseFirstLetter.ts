/**
 * Takes a string and returns it with first letter capitalised.
 * @params text - String to be capitalised.
 * @returns string with capitalised first letter.
 */
export const capitaliseFirstLetter = (text: string) => {
  if (!text[0]) return '';

  return text[0].toUpperCase() + text.substring(1);
};
