import path from 'node:path';
import {
  describe, expect, test,
} from '@jest/globals';
import genDiff from '../src/index.js';
import resultStylish from '../__fixtures__/result.js';
import resultPlain from '../__fixtures__/resultPlain.js';
import resultJSON from '../__fixtures__/resultJSON.js';

const testList = [
  'yml',
  'json',
];
//
const resolvePath = (filePath) => path.resolve(process.cwd(), `__fixtures__/${filePath}`);

describe('gendiff', () => {
  test.each(testList)('gendiff %s', (format) => {
    const filepath1 = resolvePath(`file1.${format}`);
    const filepath2 = resolvePath(`file2.${format}`);

    expect(genDiff(filepath1, filepath2)).toEqual(resultStylish);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(resultStylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(resultPlain);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(resultJSON);
  });
});
