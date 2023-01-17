import genDiff from '../src/index.js'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)

describe('test with json files', () => {
  test('testing gendiff', () => {
    expect(genDiff('file1.json', 'file2.json')).toEqual()
  })
})

describe('test with .yaml files', () => {
  test('testing genDiff with .yaml files', () => {
    expect(genDiff('file1.yml', 'file2.yml')).toEqual(expected)
  })
})
