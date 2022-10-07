#!/usr/bin/env node

import { program } from 'commander';

program
.name('gendiff')
.version('0.1.0', '-V --version', 'output the version number' )
.helpOption('-h, --help', 'display help for command')
.option('-f, --format <type>', 'output format')
.description('Compares two configuration files and show a difference');
console.log("Ytlj");

program.parse();
