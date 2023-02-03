import genDiff from '../src/index.js'
import path, { dirname } from 'path'
/* import _ from 'lodash' */
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)

const expectedJson = readFileSync(getFixturePath('resultJson.txt'), 'utf-8')
const expectedPlain = readFileSync(getFixturePath('resultPlain.txt'), 'utf-8')
const expectedStylish = readFileSync(getFixturePath('resultStylish.txt'), 'utf-8')

describe('test with json files', () => {
  test('testing gendiff with json files', () => {
    expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(expectedJson)
  })
})

describe('test stylish format', () => {
  test('testing output formats (stylish)', () => {
    expect(genDiff('file1.yml', 'file2.yml', 'stylish')).toEqual(expectedStylish)
  })
})

describe('test without format', () => {
  test('testing output without format', () => {
    expect(genDiff('file1.yml', 'file2.yml')).toEqual(expectedStylish)
  })
})
describe('testing plain format', () => {
  test('plain output', () => {
    expect(genDiff('file1.yaml', 'file2.yaml', 'plain'))
      .toEqual(expectedPlain)
  })
})
