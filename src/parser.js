import yaml from 'js-yaml';

const mapping = {
  yml: yaml.load,
  yaml: yaml.load,
  json: JSON.parse,
};

const parse = (data, type) => mapping[type](data);
export default parse;
