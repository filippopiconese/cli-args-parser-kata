module.exports = function parseFlags (str) {
  if (typeof str !== 'string') return new Error('Wrong input, only a string is allowed as input.')

  return getParsedFlags(str)
}

function getParsedFlags (str) {
  const parsedFlags = {}
  let editableStr = str

  while (editableStr.includes('--') && editableStr.length > 0) {
    let n = editableStr.indexOf('--') + 2
    let k = editableStr.indexOf(' ') === -1 ? editableStr.length : editableStr.indexOf(' ')

    const flag = editableStr.slice(n, k).trim()

    if (parsedFlags[flag] !== undefined) {
      parsedFlags[flag] = [parsedFlags[flag]]
    }

    if (k === editableStr.length) {
      Array.isArray(parsedFlags[flag]) ? parsedFlags[flag].push(true) : parsedFlags[flag] = true

      editableStr = ''
    } else {
      if (editableStr.charAt(k + 1) === '-') {
        Array.isArray(parsedFlags[flag]) ? parsedFlags[flag].push(true) : parsedFlags[flag] = true

        editableStr = editableStr.slice(k).trim()
      } else {
        editableStr = editableStr.slice(k).trim()

        const noMoreFlags = editableStr.indexOf('--') === -1

        const value = noMoreFlags
          ? editableStr.slice(0, editableStr.length).trim()
          : editableStr.slice(0, editableStr.indexOf('--')).trim()

        Array.isArray(parsedFlags[flag]) ? parsedFlags[flag].push(parseInt(value) || value) : parsedFlags[flag] = parseInt(value) || value

        editableStr = editableStr.slice(editableStr.indexOf('--')).trim()
      }
    }
  }

  return parsedFlags
}
