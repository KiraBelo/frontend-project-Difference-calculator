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

const iter = (tree, parent = '') => {
  const lines = tree.map((node) => {
    const allKeys = parent ? `${parent}.${node.key}` : `${node.key}`;

    switch (node.type) {
      case 'nested': {
        return `${iter(node.children, allKeys).filter(Boolean).join('\n')}`;
      }
      case 'deleted':
        return `Property '${allKeys}' was removed`;
      case 'changed':
        return `Property '${allKeys}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      case 'added':
        return `Property '${allKeys}' was added with value: ${stringify(node.value)}`;
      case 'notchanged':
        return '';
      default:
        throw new Error(`error: unknown type - ${node.type}`);
    }
  });
  return lines;
};

const formatPlain = (tree) => iter(tree).filter(Boolean).join('\n');

export default formatPlain;
