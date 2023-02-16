import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const outputPlain = readFile('resultPlain.txt').trim();
const outputStylish = readFile('resultStylish.txt').trim();
const outputJson = readFile('resultJson.txt').trim();

describe('difference calculator', () => {
  test('yml', () => {
    expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(outputStylish);
    expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(outputPlain);
    expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(outputJson);
    expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(outputStylish);
  });
  test('yaml', () => {
    expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish')).toEqual(outputStylish);
    expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain')).toEqual(outputPlain);
    expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json')).toEqual(outputJson);
    expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual(outputStylish);
  });
  test('json', () => {
    expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(outputStylish);
    expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(outputPlain);
    expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(outputJson);
    expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(outputStylish);
  });
});
