import _ from 'lodash';

const makeStylishDiff = (obj1, obj2, depth = 1) => {
  const formatValue1 = (value, depth1) => {
    if (_.isObject(value)) {
      return makeStylishDiff(value, value, depth1 + 1);
    }
    return value;
  };
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

  const diffLines = keys.map((key) => {
    const currentDepth = '  '.repeat(depth);
    const indentation = '  '.repeat(depth + 1);
    if (!_.has(obj1, key)) {
      return `${currentDepth}+ ${key}: ${formatValue1(obj2[key], depth + 1, indentation)}`;
    }
    if (!_.has(obj2, key)) {
      return `${currentDepth}- ${key}: ${formatValue1(obj1[key], depth + 1, indentation)}`;
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return `${currentDepth}  ${key}: ${makeStylishDiff(obj1[key], obj2[key], depth + 2)}`;
    }
    if (obj1[key] === obj2[key]) {
      return `${currentDepth}  ${key}: ${formatValue1(obj1[key], depth + 1, indentation)}`;
    }
    return `${currentDepth}- ${key}: ${formatValue1(obj1[key], depth + 1, indentation)}\n${currentDepth}+ ${key}: ${formatValue1(obj2[key], depth + 1, indentation)}`;
  });

  return `{\n${diffLines.join('\n')}\n${'  '.repeat(depth - 1)}}`;
};

const makePlainDiff = (obj1, obj2) => {
  const diffOutput = [];

  const formatValue = (value) => {
    if (_.isObject(value)) {
      return '[complex value]';
    }
    if (typeof value === 'string') return `'${value}'`;
    return value;
  };

  const traverseObject = (obj11, obj22, prefix = '') => {
    Object.keys(obj11).forEach((key) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (!Object.prototype.hasOwnProperty.call(obj22, key)) {
        diffOutput.push(`Property '${fullKey}' was removed`);
      } else if (_.isEqual(obj11[key], obj22[key])) {
        // Property exists in both objects and their values are equal
        // No action needed
      } else if (_.isPlainObject(obj11[key]) && _.isPlainObject(obj22[key])) {
        traverseObject(obj11[key], obj22[key], fullKey);
      } else {
        diffOutput.push(`Property '${fullKey}' was updated. From ${formatValue(obj11[key])} to ${formatValue(obj22[key])}`);
      }
    });

    Object.keys(obj2).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(obj11, key)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        diffOutput.push(`Property '${fullKey}' was added with value: ${formatValue(obj22[key])}`);
      }
    });
  };

  traverseObject(obj1, obj2);

  return diffOutput.sort().join('\n');
};
const formatter = (data1, data2, format) => {
  switch (format) {
    case 'stylish':
      return makeStylishDiff(data1, data2);
    case 'plain':
      return makePlainDiff(data1, data2);
    case 'json':
      return JSON.stringify(data1, data2, null);
    default:
      throw new Error('invalid data');
  }
};

export default formatter;
