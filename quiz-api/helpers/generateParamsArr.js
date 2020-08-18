export const generateParamsArr = (idsArr) => {
  const paramsArray = idsArr.map((id) => ({
    questionId: id,
  }));
  return paramsArray;
};
