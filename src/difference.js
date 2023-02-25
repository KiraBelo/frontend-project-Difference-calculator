import _ from 'lodash';

const getKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  return _.sortBy(_.union(keys1, keys2));
};

const buildDiffs = (data1, data2) => {
  const keys = getKeys(data1, data2);
  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { type: 'deleted', key, value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { type: 'nested', key, children: buildDiffs(data1[key], data2[key]) };
    }
    if ((_.has(data1, key) && _.has(data2, key)) && (data1[key] !== data2[key])) {
      return {
        type: 'changed', key, value1: data1[key], value2: data2[key],
      };
    }
    return { type: 'notchanged', key, value: data1[key] };
  });
};
export default buildDiffs;
