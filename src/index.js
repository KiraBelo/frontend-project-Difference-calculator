#!/usr/bin/env node
import fs from 'fs';
import path from 'node:path';
import parse from './parser.js';
import buildDiffs from './difference.js';
import format from './formatter/index.js';

const builtFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const getFormat = (filepath) => path.extname(filepath).slice(1);

const readFile = (filepath) => {
  const fullPath = builtFullPath(filepath);
  const fileFormat = getFormat(filepath);
  return parse(fs.readFileSync(fullPath, 'utf-8').trim(), fileFormat);
};

const gendiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const diffs = buildDiffs(data1, data2);
  return format(diffs, outputFormat);
};

export default gendiff;
