import { readFileSync } from 'node:fs';
import   genDiff   from './index.js';
/* import jsYaml from 'js-yaml';
 */
 const parse =(filepath1, filepath2, format) => {
  console.log(format)
    const file1 = readFileSync(filepath1, 'utf-8');
    const file2 = readFileSync(filepath2, 'utf-8');
    const result = genDiff(JSON.parse(file1), JSON.parse(file2))
    return result
  }
  export default parse