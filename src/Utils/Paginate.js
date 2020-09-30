import _ from "lodash";

const paginate = (itemsArray, pageSize, pageNo) => {
  const startIndex = (pageNo - 1) * pageSize;
  return _(itemsArray).slice(startIndex).take(pageSize).value();
};

export default paginate;
