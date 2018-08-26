module.exports = function parseFlags (input) {
  if (typeof input !== 'string' && !Array.isArray(input)) return new Error('Wrong input, only a string or an array are allowed.')

  const str = stringifyInput(input)

  return getParsedFlags(str)
}

function stringifyInput (input) {
  if (typeof input === 'string') return input

  const str = input.join(' ')

  return str
}

function getParsedFlags (str) {
  const parsedFlags = {}

  let flagIndicator = ''
  let flag = ''
  let valueIncoming = false
  let value = ''

  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i)

    if (flagIndicator === '--' && !valueIncoming && char !== ' ') {
      flag += char
    }

    if (char === '-') {
      flagIndicator += '-'
    }

    if (valueIncoming) {
      value += char
    }

    if (char === ' ' && valueIncoming) { // we have found a value for the flag
      parsedFlags[flag] = insertValue(parsedFlags, flag, value)

      flagIndicator = ''
      flag = ''
      value = ''
      valueIncoming = false
    }

    if (char === ' ' && flag !== '' && !valueIncoming) {
      if (str.charAt(i + 1) === '-') { // the flag has not a value
        parsedFlags[flag] = insertValue(parsedFlags, flag, true)

        flagIndicator = ''
        flag = ''
      } else {
        valueIncoming = true
      }
    }

    if (str.charAt(i + 1) === '' && flag !== '') { // it's useful at the end of the string in order to get the final value
      value === ''
        ? parsedFlags[flag] = insertValue(parsedFlags, flag, true)
        : parsedFlags[flag] = insertValue(parsedFlags, flag, value)
    }
  }

  return parsedFlags
}

function insertValue (parsedFlags, flag, value) {
  const trimValue = typeof value === 'string' ? value.trim() : value

  if (parsedFlags[flag] === undefined) return parseInt(trimValue) || trimValue

  if (Array.isArray(parsedFlags[flag])) return parsedFlags[flag].push(parseInt(trimValue) || trimValue)

  return [parsedFlags[flag], parseInt(trimValue) || trimValue]
}
