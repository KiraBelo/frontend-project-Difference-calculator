/* import gendiff from '../src/index.js';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8').trim();

const fileJson1 = readFile('file1.json');
console.log(fileJson1);
const fileJson2 = readFile('file2.json');
const fileYml1 = readFile('file1.yml');
const fileYml2 = readFile('file2.yml');

const expectedJson = readFile('resultJson.txt');
const expectedPlain = readFile('resultPlain.txt');
const expectedStylish = readFile('resultStylish.txt');

test('gendiff for .json', () => {
  expect(gendiff(fileJson1, fileJson2, 'stylish')).toEqual(expectedStylish);
});
test('gendiff for .yml', () => {
  expect(gendiff(fileYml1, fileYml2, 'plain')).toEqual(expectedPlain);
});
test('gendiff for .json with plain format', () => {
  expect(gendiff(fileJson1, fileJson2, 'plain')).toEqual(expectedPlain);
});
test('gendiff for .yml with stylish format', () => {
  expect(gendiff(fileYml1, fileYml2, 'stylish')).toEqual(expectedStylish);
});

test('gendiff for .json with json format', () => {
  expect(gendiff(fileJson1, fileJson2, 'json')).toEqual(expectedJson);
});

test('gendiff for .yml with json format', () => {
  expect(gendiff(fileYml1, fileYml2, 'json')).toEqual(expectedJson);
}); */

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
