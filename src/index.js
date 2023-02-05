#!/usr/bin/env node
import fs from 'fs';
import path from 'node:path';
import parser from '../__fixtures__/parser.js';
import getDifferences from './difference.js';
import formatters from './formatter/index.js';

/* const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename) */
const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filename) => path.extname(filename).slice(1);

const gendiff = (filename1, filename2, format = 'stylish') => {
  const format1 = getFormat(filename1);
  const format2 = getFormat(filename2);

  const getFullPath1 = getPath(filename1);
  const getFullPath2 = getPath(filename2);

  const file1 = fs.readFileSync(getFullPath1, 'utf-8').trim();
  const file2 = fs.readFileSync(getFullPath2, 'utf-8').trim();

  const data1 = parser(file1, format1);
  const data2 = parser(file2, format2);
  const diff = getDifferences(data1, data2);

  return formatters(diff, format);
};

export default gendiff;
