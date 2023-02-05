import _ from 'lodash';
import values from './values.js';

const makeSpaces = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const makeString = (data, depth = 1) => {
  if (!_.isObject(data) || data === null) { return String(data); }

  const lines = Object.entries(data).map(([key, value]) => `${makeSpaces(depth + 1)}  ${key}: ${makeString(value, depth + 1)}`);
  const result = ['{', ...lines, `${makeSpaces(depth)}  }`].join('\n');
  return result;
};

const formaterStylish = (tree) => {
  const iter = (data, depth) => {
    const types = data.type;
    const keys = data.key;

    switch (types) {
      case 'nested': {
        const nested = data.children;
        const children = nested.map((child) => iter(child, depth + 1));
        return `${makeSpaces(depth)}${values[types]}${keys}: {\n${children.join('\n')}\n${makeSpaces(depth)}  }`;
      }
      case 'deleted': return `${makeSpaces(depth)}${values[types]}${keys}: ${makeString(data.value, depth)}`;
      case 'changed': {
        const str1 = `${makeSpaces(depth)}${values[types][0]}${keys}: ${makeString(data.value1, depth)}`;
        const str2 = `${makeSpaces(depth)}${values[types][1]}${keys}: ${makeString(data.value2, depth)}`;
        return [str1, str2].join('\n');
      }
      case 'added': return `${makeSpaces(depth)}${values[types]}${keys}: ${makeString(data.value, depth)}`;
      case 'notchanged' : return `${makeSpaces(depth)}${values[types]}${keys}: ${makeString(data.value, depth)}`;
      default: return `error: unknown type - ${types}`;
    }
  };
  const result = tree.map((data) => iter(data, 1));
  return ['{', ...result, '}'].join('\n').trimEnd();
};
export default formaterStylish;
