import formatStylish from './stylish.js';
import formatPlain from './plainformat.js';

const getFormaters = (tree, format) => {
    switch (format) {
    case 'json':
        return JSON.stringify(tree);
    case 'stylish':
        return formatStylish(tree);
    case 'plain':
        return formatPlain(tree);
    default: return Error(`Unknown format - ${format}`);
    }
};
export default getFormaters;
