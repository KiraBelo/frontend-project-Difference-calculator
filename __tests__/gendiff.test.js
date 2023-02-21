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
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(outputStylish);
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(outputPlain);
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(outputJson);
    expect(gendiff(filepath1, filepath2)).toEqual(outputStylish);
  });
  test('yaml', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yaml');
    expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(outputStylish);
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(outputPlain);
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(outputJson);
    expect(gendiff(filepath1, filepath2)).toEqual(outputStylish);
  });
  test('json', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(outputStylish);
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(outputPlain);
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(outputJson);
    expect(gendiff(filepath1, filepath2)).toEqual(outputStylish);
  });
});
