export const generateParamsArr = (idsArr,numsArr) => {
  const paramsArray = numsArr.map((num) => (
     idsArr[num]
  ));
  return paramsArray;
};
