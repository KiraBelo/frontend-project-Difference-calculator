import formatStylish from './stylish.js';
import formatPlain from './plainFormat.js';

const format = (tree, outputFormat) => {
  const formattes = {
    json: JSON.stringify(tree),
    stylish: formatStylish(tree),
    plain: formatPlain(tree),
  };
  return formattes[outputFormat];
};
export default format;
