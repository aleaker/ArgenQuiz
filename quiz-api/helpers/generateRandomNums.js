export const generateRandomNums = (arrLength, amount) => {
  let randomNumsArr = [];
  if (amount < 1) amount = 1;
  if (amount > 10) amount = 10;
  if (arrLength < amount) amount = arrLength;
  while (randomNumsArr.length < amount) {
    let n = Math.floor(Math.random() * (arrLength + 1));
    if (!randomNumsArr.includes(n)) {
      randomNumsArr.push(n);
    }
  }
  return randomNumsArr;
};
