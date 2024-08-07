/**
 * Generates a random 4 digit lobby code.
 * @returns Random lobby code.
 */
export const generateSessionId = () => {
  return Math.floor(Math.random() * (9999 - 1111 + 1) + 1111).toString();
};
