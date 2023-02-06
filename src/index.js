#!/usr/bin/env node
import fs from 'fs';
import path from 'node:path';
import parser from '../__fixtures__/parser.js';
import getDifferences from './difference.js';
import formatters from './formatter/index.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).slice(1);

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);

  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);

  const fileData1 = fs.readFileSync(path1, 'utf-8').trim();
  const fileData2 = fs.readFileSync(path2, 'utf-8').trim();

  const data1 = parser(fileData1, format1);
  const data2 = parser(fileData2, format2);
  const diff = getDifferences(data1, data2);
  const formattedDiffs = formatters(diff, format);

  return formattedDiffs;
};

export default gendiff;
