import _ from 'lodash';

const makeSpaces = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (node, depth = 1) => {
  if (!_.isObject(node)) {
    return String(node);
  }

  const lines = Object.entries(node).map(([key, value]) => `${makeSpaces(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${makeSpaces(depth)}  }`;
};

const iter = (tree, depth = 1) => tree.map((node) => {
  switch (node.type) {
    case 'nested': {
      const lines = iter(node.children, depth + 1);
      return `${makeSpaces(depth)}  ${node.key}: {\n${lines.join('\n')}\n${makeSpaces(depth)}  }`;
    }
    case 'deleted':
      return `${makeSpaces(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
    case 'changed': {
      const line1 = `${makeSpaces(depth)}- ${node.key}: ${stringify(node.value1, depth)}`;
      const line2 = `${makeSpaces(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
      return `${line1}\n${line2}`;
    }
    case 'added':
      return `${makeSpaces(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
    case 'notchanged':
      return `${makeSpaces(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
    default:
      throw new Error('Unknown node type');
  }
});

const formatStylish = (tree) => `{\n${iter(tree, 1).join('\n')}\n}`;

export default formatStylish;
