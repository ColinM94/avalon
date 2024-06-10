export const generateLobbyCode = () => {
  return Math.floor(Math.random() * (9999 - 1111 + 1) + 1111).toString();
};
