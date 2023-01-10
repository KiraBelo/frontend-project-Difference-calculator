#!/usr/bin/env node

import { readFileSync } from 'node:fs'
import _ from 'lodash'

const genDiff = (filepath1, filepath2) => {
  const file1 = readFileSync(filepath1, 'utf-8');
  const file2 = readFileSync(filepath2, 'utf-8');

  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2)
  const tree = keys.map((key) => {
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: data2[key] }
    }
    if (!_.has(data2, key)) {
      return { type: 'deleted', key, value: data1[key] }
    }
    if (data2[key] !== data1[key]) {
      return {
        type: 'changed', key, value1: data1[key], value2: data2[key]
      }
    }
    return { type: 'notchanged', key, value: data1[key] }
  })
  const valueses = {
    nested: '',
    added: '+',
    deleted: '-',
    changed: ['-', '+']
  }
  const maketree = tree.reduce((result, item) => {
    if (item.type === 'deleted') {
      const string = `${valueses[item.type]} ${item.key}: ${item.value}`
      result.push(string)
    }
    if (item.type === 'changed') {
      const string1 = `${valueses[item.type][0]} ${item.key}: ${item.value1}`
      const string2 = `${valueses[item.type][1]} ${item.key}: ${item.value2}`
      result.push(string1)
      result.push(string2)
    }
    if (item.type === 'added') {
      const string = `${valueses[item.type]} ${item.key}: ${item.value}`
      result.push(string)
    };
    if (item.type === 'notchanged') {
      const string = `  ${item.key}: ${item.value}`
      result.push(string)
    }
    return result
  }, [])
  return maketree.join('\n');
}
export default genDiff
