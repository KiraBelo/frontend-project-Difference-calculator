import _ from 'lodash'

const makeString = (data) => {
  if (_.isObject(data)) { return '[complex value]' }
  if (typeof data === 'string') { return `'${data}'` }
  return String(data)
}

const formatPlain = (tree) => {
  const iter = (data, parent) => {
    const types = data.type
    const keys = data.key
    const allKeys = parent ? `${parent}.${keys}` : `${keys}`
    switch (types) {
      case 'deleted': return `Property '${allKeys}' was removed`
      case 'added': return `Property '${allKeys}' was added with value: ${makeString(data.value)}`
      case 'changed': return `Property '${allKeys}' was updated. From ${makeString(data.value1)} to ${makeString(data.value2)}`
      case 'nested': {
        const childrens = data.children
          .map((child) => iter(child, allKeys))
          .filter((child) => child !== '')
        return `${childrens.join('\n')}`
      }
      case 'notchanged': return ''
      default: return `error: unknown type - ${types}`
    }
  }
  const result = tree
    .map((data) => iter(data))
    .filter((data) => data !== '')
  return `${result.join('\n')}`
}

export default formatPlain
