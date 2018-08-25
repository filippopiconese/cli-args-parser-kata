module.exports = function parseFlags (str) {
  if (typeof str !== 'string') return new Error('Wrong input, only a string is allowed as input.')

  return getParsedFlags(str)
}

function getParsedFlags (str) {
  const parsedFlags = {}

  if (str.includes('--')) {
    let n = str.indexOf('--') + 2
    let k = str.indexOf(' ') === -1 ? str.length : str.indexOf(' ')

    if (k === str.length) {
      parsedFlags[str.slice(n, k)] = true
    } else {
      parsedFlags[str.slice(n, k)] = parseInt(str.slice(k + 1)) || str.slice(k + 1)
    }
  }

  return parsedFlags
}
