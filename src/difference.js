import _ from 'lodash'

const getKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  return _.sortBy(_.union(keys1, keys2))
}

const getDifferences = (data1, data2) => {
  const keys = getKeys(data1, data2)
  const result = keys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { type: 'nested', key, children: getDifferences(data1[key], data2[key]) }
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { type: 'notchanged', key, value: data1[key] }
    } if (_.has(data1, key) && _.has(data2, key)) {
      return { type: 'changed', key, value1: data1[key], value2: data2[key] }
    } if (!_.has(data1, key)) {
      return { type: 'added', key, value: data2[key] }
    } if (!_.has(data2, key)) {
      return { type: 'deleted', key, value: data1[key] }
    }
    return 'error: incorrect case'
  })
  return result
}
export default getDifferences
