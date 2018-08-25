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

test('Parse a simple flags', t => {
  const INPUT = '--foo'

  const OUTPUT = { 'foo': true }

  t.deepEqual(flagsParser(INPUT), OUTPUT)
})

test('Parse a composite flags', t => {
  const INPUT = '--foo bar'

  const OUTPUT = { 'foo': 'bar' }

  t.deepEqual(flagsParser(INPUT), OUTPUT)
})

test('Parse a composite flags with integer values', t => {
  const INPUT = '--number 1'

  const OUTPUT = { 'number': 1 }

  t.deepEqual(flagsParser(INPUT), OUTPUT)
})
