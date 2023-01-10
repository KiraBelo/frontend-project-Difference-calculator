#!/usr/bin/env node

import genDiff from '../src/index.js'
import { Command } from 'commander'

const program = new Command();
program
  .name('gendiff')
  .version('0.1.0', '-V --version', 'output the version number')
  .helpOption('-h, --help', 'display help for command')
  .option('-f, --format <type>', 'output format')
  .description('Compares two configuration files and show a difference')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath2>', 'path to file2')
  .action((filepath1, filepath2) => {
      console.log(genDiff(filepath1, filepath2))
  })
.parse();
