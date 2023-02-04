import _ from 'lodash'

const formatPlain = (tree) => {
  const makeString = (data) => {
    return _.isObject(data) ? '[complex value]' : typeof data === 'string' ? `'${data}'` : String(data)
  }

  const actions = {
    deleted: (allKeys) => `Property '${allKeys}' was removed`,
    added: (allKeys, value) => `Property '${allKeys}' was added with value: ${makeString(value)}`,
    changed: (allKeys, value1, value2) => `Property '${allKeys}' was updated. From ${makeString(value1)} to ${makeString(value2)}`,
    nested: (allKeys, children) => children.filter((child) => child !== '').join('\n'),
    notchanged: () => ''
  }

  const iter = (data, parent) => {
    const { type, key, value, value1, value2, children } = data
    const allKeys = parent ? `${parent}.${key}` : `${key}`
    return actions[type](allKeys, value, value1, value2, children.map((child) => iter(child, allKeys)))
  }

  return tree
    .map((data) => iter(data))
    .filter((data) => data !== '')
    .join('\n')
}

export default formatPlain
