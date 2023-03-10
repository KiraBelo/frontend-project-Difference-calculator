import _ from 'lodash';
import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const format = (tree, outputFormat) => {
  const formatters = {
    json: JSON.stringify(tree),
    stylish: formatStylish(tree),
    plain: formatPlain(tree),
  };
  if (!_.has(formatters, outputFormat)) { throw new Error(`Unknown output format: ${outputFormat}`); }
  return formatters[outputFormat];
};
export default format;
