import yaml from 'js-yaml'
import path, { dirname } from 'path'

  const parser = (file, extention) => {
      let data;
  switch(extention){
      case('json'): data = JSON.parse(file);break;
      case('yaml'): data = yaml.load(file);break;
      case('yml'): data = yaml.load(file);break;
      default: data = 'you need choose json or yaml format';break;}
 return data; 

  }
 export default parser;
