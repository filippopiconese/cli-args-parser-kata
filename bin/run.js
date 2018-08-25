// Here we will run the index
const flagsParser = require('../index')

function main (input) {
  return flagsParser(input)
}

console.log(main(['--foo', '--bar', 'baz', '--bar', 'zab', '--number', 1]))
