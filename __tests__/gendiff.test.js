import genDiff from '../src/index.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'node:url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8')

const expectedJson = readFile('resultJson.txt').trim()
const expectedPlain = readFile('resultPlain.txt').trim()
const expectedStylish = readFile('resultStylish.txt').trim()

test('gendiff for .json', () => {
  expect(genDiff('file1.json', 'file2.json', 'stylish')).toEqual(expectedStylish)
})
test('gendiff for .yml', () => {
  expect(genDiff('file1.yml', 'file2.yml', 'plain')).toEqual(expectedPlain)
})
test('gendiff for .json with plain format', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(expectedPlain)
})
test('gendiff for .yml with stylish format', () => {
  expect(genDiff('file1.yml', 'file2.yml', 'stylish')).toEqual(expectedStylish)
})

test('gendiff for .json with json format', () => {
  expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(expectedJson)
})

test('gendiff for .yml with json format', () => {
  expect(genDiff('file1.yml', 'file2.yml', 'json')).toEqual(expectedJson)
})
