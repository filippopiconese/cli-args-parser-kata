import test from 'ava'

const flagsParser = require('../index')

test('Should throws because the input is not a string', t => {
  const error = flagsParser(['ciao'])

  t.is(error.message, 'Wrong input, only a string is allowed as input.')
})

test('Wrong string given as input', t => {
  const INPUT = 'foo'

  const OUTPUT = {}

  t.deepEqual(flagsParser(INPUT), OUTPUT)
})

test('Parse a simple flag', t => {
  const INPUT = '--foo'

  const OUTPUT = { 'foo': true }

  t.deepEqual(flagsParser(INPUT), OUTPUT)
})

test('Parse a composite flag', t => {
  const INPUT = '--foo bar'

  const OUTPUT = { 'foo': 'bar' }

  t.deepEqual(flagsParser(INPUT), OUTPUT)
})
