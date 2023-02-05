#!/usr/bin/env node
import * as fs from 'node:fs'
import path, { dirname } from 'path'
import parser from '../__fixtures__/parser.js'
import { fileURLToPath } from 'node:url'
import getDifferences from './difference.js'
import formatters from './formatter/index.js'

const gendiff = (filename1, filename2, format = 'stylish') => {
  const extractFormat = (filename) => path.extname(filename).slice(1)

  const extention1 = extractFormat(filename1)
  const extention2 = extractFormat(filename2)

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)

  const getFullPath1 = getFixturePath(filename1)
  const getFullPath2 = getFixturePath(filename2)

  const file1 = fs.readFileSync(getFullPath1, 'utf-8').trim()
  const file2 = fs.readFileSync(getFullPath2, 'utf-8').trim()

  const data1 = parser(file1, extention1)
  const data2 = parser(file2, extention2)
  const diff = getDifferences(data1, data2)

  return formatters(diff, format)
}

export default gendiff
