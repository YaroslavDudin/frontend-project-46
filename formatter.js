import _ from 'lodash';

export const MakeStylishDiff = (obj1, obj2, depth = 1) => {
    const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
    
    const diffLines = keys.map((key) => {
        const currentDepth = '  '.repeat(depth);
        if (!_.has(obj1, key)) {
            return `${currentDepth}+ ${key}: ${formatValue(obj2[key], depth + 1)}`;
        }
        if (!_.has(obj2, key)) {
            return `${currentDepth}- ${key}: ${formatValue(obj1[key], depth + 1)}`;
        }
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
            return `${currentDepth}  ${key}: ${MakeStylishDiff(obj1[key], obj2[key], depth + 2)}`;
        }
        if (obj1[key] === obj2[key]) {
            return `${currentDepth}  ${key}: ${formatValue(obj1[key], depth + 2)}`;
        }
        return `${currentDepth}- ${key}: ${formatValue(obj1[key], depth)}\n${currentDepth}+ ${key}: ${formatValue(obj2[key], depth)}`;
    });
    
    return `{\n${diffLines.join('\n')}\n${'  '.repeat(depth - 1)}}`;
};



const formatValue = (value, depth) => {
    if (_.isObject(value)) {
        return MakeStylishDiff(value, value, depth + 2);
    }
    return value;
};
