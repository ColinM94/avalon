export const sentencifyArray = (arr: string[]) => {
  if (arr.length == 0) return "";

  if (arr.length === 1) {
    return arr[0];
  }

  if (arr.length === 2) {
    return `${arr[0]} and ${arr[1]}`;
  }

  let sentence = "";

  arr.forEach((item, index) => {
    if (index === arr.length - 1) sentence += `and ${item}`;
    else sentence += `${item}, `;
  });

  return sentence;
};
