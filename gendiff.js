import { Command } from 'commander';
const program = new Command();
import { readFileSync } from 'node:fs';
program
  .name('gendiff ')
  .description('Compares two configuration files and shows a difference.')
  .version('"1.0.0"')
  .option('-f, --format [type]', 'output format')
  .usage('[options] <filepath1> <filepath2>')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2,format = 'utf-8') => {
    const file1 = readFileSync(filepath1, format);
    const file2 = readFileSync(filepath2, format);
    console.log(`${file1} \n ${file2}`);
  })
program.parse();