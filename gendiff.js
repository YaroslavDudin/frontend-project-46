const { Command } = require('commander');   
const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('"12.0.0"')
program.parse();