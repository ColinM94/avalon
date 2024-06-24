export const sentencifyArray = (arr: string[]) => {
  let sentence = "";

  arr.forEach((item, index) => {
    if (arr.length == 0) sentence += "";
    else if (arr.length === 1) sentence += arr[0];
    else if (arr.length === 2) sentence += `${arr[0]} and ${arr[1]}`;
    else if (index === arr.length - 1) sentence += `and ${item}`;
    else sentence += `${item}, `;
  });

  return sentence;
};
