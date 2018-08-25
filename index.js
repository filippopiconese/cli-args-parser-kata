module.exports = function parseFlags (stringInput) {
  if (typeof stringInput !== 'string') return new Error('Wrong input, only a string is allowed as input.')

  const parsedFlags = {}

  if (stringInput.includes('--')) {
    let n = stringInput.indexOf('--') + 2
    let k = stringInput.indexOf(' ') === -1 ? stringInput.length : stringInput.indexOf(' ')

    parsedFlags[stringInput.slice(n, k)] = true
  }

  return parsedFlags
}
