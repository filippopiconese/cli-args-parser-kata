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
  const flagIndicator = '--'
  let editableStr = str

  while (editableStr.includes(flagIndicator) && editableStr.length > 0) {
    const n = editableStr.indexOf(flagIndicator) + 2
    const k = editableStr.indexOf(' ') === -1 ? editableStr.length : editableStr.indexOf(' ')

    const flag = editableStr.slice(n, k).trim()

    if (k === editableStr.length) {
      parsedFlags[flag] = insertValue(parsedFlags, flag, true)

      editableStr = ''
    } else {
      if (editableStr.charAt(k + 1) === '-') {
        parsedFlags[flag] = insertValue(parsedFlags, flag, true)

        editableStr = editableStr.slice(k).trim()
      } else {
        editableStr = editableStr.slice(k).trim()

        const noMoreFlags = editableStr.indexOf(flagIndicator) === -1

        const value = noMoreFlags
          ? editableStr.slice(0, editableStr.length).trim()
          : editableStr.slice(0, editableStr.indexOf(flagIndicator)).trim()

        parsedFlags[flag] = insertValue(parsedFlags, flag, value)

        editableStr = editableStr.slice(editableStr.indexOf(flagIndicator)).trim()
      }
    }
  }

  return parsedFlags
}

function insertValue (parsedFlags, flag, value) {
  if (parsedFlags[flag] === undefined) return parseInt(value) || value

  if (Array.isArray(parsedFlags[flag])) return parsedFlags[flag].push(parseInt(value) || value)

  return [parsedFlags[flag], parseInt(value) || value]
}
