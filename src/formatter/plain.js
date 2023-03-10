import _ from 'lodash';

const stringify = (node) => {
  if (_.isObject(node)) {
    return '[complex value]';
  }
  if (typeof node === 'string') {
    return `'${node}'`;
  }
  return String(node);
};

const formatPlain = (tree) => {
  const iter = (data, parent) => {
    const types = data.type;
    const keys = data.key;
    const allKeys = parent ? `${parent}.${keys}` : `${keys}`;
    switch (types) {
      case 'deleted':
        return `Property '${allKeys}' was removed`;
      case 'added':
        return `Property '${allKeys}' was added with value: ${stringify(data.value)}`;
      case 'changed':
        return `Property '${allKeys}' was updated. From ${stringify(data.value1)} to ${stringify(data.value2)}`;
      case 'nested': {
        const childrens = data.children
          .map((child) => iter(child, allKeys))
          .filter((child) => child !== '');
        return `${childrens.join('\n')}`;
      }
      case 'notchanged':
        return '';
      default:
        throw new Error(`error: unknown type - ${types}`);
    }
  };

  const result = tree
    .map((data) => iter(data))
    .filter((data) => data !== '');
  return `${result.join('\n')}`;
};

export default formatPlain;
