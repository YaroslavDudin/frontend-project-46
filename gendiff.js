import { Command } from 'commander';
const program = new Command();
import parse from './parsers.js';
program
  .name('gendiff ')
  .description('Compares two configuration files and shows a difference.')
  .version('"1.0.0"')
  .option('-f, --format [type]', 'output format', 'stylish')
  .usage('[options] <filepath1> <filepath2>')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const formatName = program.opts().format;
    console.log(formatName);
    console.log(parse(filepath1, filepath2, formatName));
})
program.parse();
