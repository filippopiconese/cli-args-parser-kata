import test from 'ava'

const flagsParser = require('../index')

test('Should throws because the input is not a string', t => {
  const error = flagsParser(['ciao'])

  t.is(error.message, 'Wrong input, only a string is allowed as input.')
})
