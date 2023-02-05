import yaml from "js-yaml";

const parser = (file, extention) => {
    switch (extention) {
    case ("json"): return JSON.parse(file);
    case ("yaml"): return yaml.load(file);
    case ("yml"): return yaml.load(file);
    default: return "you need choose json or yaml format";
    }
};
export default parser;
