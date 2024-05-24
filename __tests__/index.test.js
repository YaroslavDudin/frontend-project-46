import { describe, expect, it, test } from '@jest/globals';
import genDiff from '../index.js';
import * as funccs from  '../results.js';
import path from 'node:path';
const testList = [
  'yml',
  'json',
];
const resolvePath = (filePath) => path.resolve(process.cwd(), `__fixtures__/${filePath}`);
 
describe('gendiff', () => {
  test.each(testList)('gendiff %s', (format) => {
    const filepath1 = resolvePath(`file1.${format}`);
    const filepath2 = resolvePath(`file2.${format}`);

    expect(genDiff(filepath1, filepath2)).toEqual(funccs.expectedStylishOutput);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(funccs.expectedStylishOutput);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(funccs.expectedPlainOutput);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(funccs.expectedJsonOutput);
  });
});