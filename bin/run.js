// Here we will run the index
const flagsParser = require('../index')

const args = process.argv.slice(2)

function main () {
  const flagsWithValues = flagsParser(args)

  console.log(flagsWithValues)

  return flagsWithValues
}

main()
