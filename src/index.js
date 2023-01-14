#!/usr/bin/env node

import * as fs from 'node:fs'
import _ from 'lodash'
import path, { dirname } from 'path'

import { fileURLToPath } from 'node:url'

const genDiff = (filename1, filename2) => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)

  const getFullPath1 = getFixturePath(filename1)
  const getFullPath2 = getFixturePath(filename2)
  /*  const extractFormat = (filePath) => path.extname(filePath).slice(1);

    const formatName1 = extractFormat(filename1);
    const formatName2 = extractFormat(filename2);
    const file1 = fs.readFileSync(path.resolve(process.cwd(), formatName1), 'utf-8');
    const file2 = fs.readFileSync(path.resolve(process.cwd(), formatName2), 'utf-8'); */

  const file1 = fs.readFileSync(getFullPath1, 'utf-8').trim()
  const file2 = fs.readFileSync(getFullPath2, 'utf-8').trim()

  const data1 = JSON.parse(file1)
  const data2 = JSON.parse(file2)

  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
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
  return maketree.join('\n')
}
export default genDiff
