import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const outputPlain = readFileSync('__fixtures__/resultPlain.txt', 'utf8').trim();
const outputStylish = readFileSync('__fixtures__/resultStylish.txt', 'utf8').trim();
const outputJson = readFileSync('__fixtures__/resultJson.txt', 'utf8').trim();

test('gendiff for .json', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';
  expect(gendiff(path1, path2, 'stylish')).toEqual(outputStylish);
});
test('gendiff for .yml', () => {
  const path1 = '__fixtures__/file1.yml';
  const path2 = '__fixtures__/file2.yml';
  expect(gendiff(path1, path2, 'stylish')).toEqual(outputStylish);
});
test('gendiff for tree .json, plain format', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';
  expect(gendiff(path1, path2, 'plain')).toEqual(outputPlain);
});

test('gendiff for tree .json, json format', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';
  expect(gendiff(path1, path2, 'json')).toEqual(outputJson);
});
