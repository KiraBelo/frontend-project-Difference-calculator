import _ from 'lodash';

const makeSpaces = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (node, depth = 1) => {
  if (!_.isObject(node)) { return String(node); }

  const lines = Object.entries(node).map(([key, value]) => `${makeSpaces(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${[...lines].join('\n')}\n${makeSpaces(depth)}  }`;
};
const iter = (node, depth) => {
  const types = node.type;
  const keys = node.key;

  switch (types) {
    case 'nested': {
      const lines = node.children.map((child) => iter(child, depth + 1));
      return `${makeSpaces(depth)}  ${keys}: {\n${lines.join('\n')}\n${makeSpaces(depth)}  }`;
    }
    case 'deleted': return `${makeSpaces(depth)}- ${keys}: ${stringify(node.value, depth)}`;
    case 'changed': {
      const line1 = `${makeSpaces(depth)}- ${keys}: ${stringify(node.value1, depth)}`;
      const line2 = `${makeSpaces(depth)}+ ${keys}: ${stringify(node.value2, depth)}`;
      return `${line1}\n${line2}`;
    }
    case 'added': return `${makeSpaces(depth)}+ ${keys}: ${stringify(node.value, depth)}`;
    case 'notchanged': return `${makeSpaces(depth)}  ${keys}: ${stringify(node.value, depth)}`;
    default: return 'error: unknown type';
  }
};

const formaterStylish = (tree) => {
  const result = tree.map((node) => iter(node, 1));
  return `{\n${[...result].join('\n')}\n}`;
};
export default formaterStylish;
