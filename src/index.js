#!/usr/bin/env node
import fs from 'fs';
import path from 'node:path';
import parse from './parser.js';
import buildDiffs from './difference.js';
import format from './formatter/index.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const fileExtension = path.extname(filepath).slice(1);
  const fileData = fs.readFileSync(fullPath, 'utf-8').trim();
  const data = parse(fileData, fileExtension);
  return data;
};

const gendiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const diffs = buildDiffs(data1, data2);
  return format(diffs, outputFormat);
};

export default gendiff;
