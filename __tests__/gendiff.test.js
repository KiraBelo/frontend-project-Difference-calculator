import genDiff from '../src/index.js'
const expected =
`  host: hexlet.io
- timeout: 50
+ timeout: 20
- proxy: 123.234.53.22
- follow: false
+ verbose: true`

describe('test with different files and formaters', () => {
  test('testing gendiff', () => {
    expect(genDiff('file1.json', 'file2.json')).toEqual(expected)
  })
})
