import _ from 'lodash'
import valueses from './valueses.js'

const makeSpaces = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2)

const makeString = (data, depth = 1) => {
  if (!_.isObject(data)) { return String(data) }

  const lines = Object.entries(data).map(([key, value]) => `  ${makeSpaces(depth + 1)}${key}: ${makeString(value, depth + 1)}`)
  const result = `{\n${lines.join('\n')}\n${makeSpaces(depth)}  }`
  return result
}

const formaterStylish = (differences, depth = 1) => {
  const result = differences.map((item) => {
    if (item.type === 'nested') {
      return `${makeSpaces(depth)}${valueses[item.type]}${item.key}: ${makeString(formaterStylish(item.children, depth + 1))}${makeSpaces(depth)}  }`
    } else if (item.type === 'deleted') {
      return `${makeSpaces(depth)}${valueses[item.type]}${item.key}: ${makeString(item.value, depth)}`
    } else if (item.type === 'changed') {
      return `${makeSpaces(depth)}${valueses[item.type][0]}${item.key}: ${makeString(item.value1, depth)}\n${makeSpaces(depth)}${valueses[item.type][1]}${item.key}: ${makeString(item.value2, depth)}`
    } else if (item.type === 'added') {
      return `${makeSpaces(depth)}${valueses[item.type]}${item.key}: ${makeString(item.value, depth)}`
    } else if (item.type === 'notchanged') {
      return `${makeSpaces(depth)}${valueses[item.type]}${item.key}: ${makeString(item.value, depth)}`
    }
    return `error: unknown type - ${item.type}`
  })
  return `\n${result.join('\n')}\n`
}
export default formaterStylish
