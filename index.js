module.exports = function parseFlags (stringInput) {
  if (typeof stringInput !== 'string') return new Error('Wrong input, only a string is allowed as input.')

  const parsedFlags = {}

  if (stringInput.includes('--')) {
    let n = stringInput.indexOf('--') + 2
    let k = stringInput.indexOf(' ') === -1 ? stringInput.length : stringInput.indexOf(' ')

    if (k === stringInput.length) {
      parsedFlags[stringInput.slice(n, k)] = true
    } else {
      parsedFlags[stringInput.slice(n, k)] = stringInput.slice(k + 1)
    }
  }

  return parsedFlags
}
