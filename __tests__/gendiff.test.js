import genDiff from '../src/index.js'
const expected =
`  host: hexlet.io
- timeout: 50
+ timeout: 20
- proxy: 123.234.53.22
- follow: false
+ verbose: true`

describe('test with json files', () => {
  test('testing gendiff', () => {
    expect(genDiff('file1.json', 'file2.json')).toEqual(expected)
  })
})

describe('test with .yaml files', () => {
  test('testing genDiff with .yaml files', () => {
    expect(genDiff('file1.yml', 'file2.yml')).toEqual(expected)
  })
})
