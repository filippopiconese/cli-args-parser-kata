import test from 'ava'

const flagsParser = require('../index')

test('Should throws because the input is nor a string neither an array', t => {
  const error = flagsParser({ foo: 'foo' })

  t.is(error.message, 'Wrong input, only a string or an array are allowed.')
})

test('Wrong string given as input', t => {
  const STRING_INPUT = 'foo'
  const ARRAY_INPUT = ['foo']

  const OUTPUT = {}

  t.deepEqual(flagsParser(STRING_INPUT), OUTPUT)
  t.deepEqual(flagsParser(ARRAY_INPUT), OUTPUT)
})

test('Parse a simple flags', t => {
  const STRING_INPUT = '--foo'
  const ARRAY_INPUT = ['--foo']

  const OUTPUT = { 'foo': true }

  t.deepEqual(flagsParser(STRING_INPUT), OUTPUT)
  t.deepEqual(flagsParser(ARRAY_INPUT), OUTPUT)
})

test('Parse a composite flags', t => {
  const STRING_INPUT = '--foo bar'
  const ARRAY_INPUT = ['--foo', 'bar']

  const OUTPUT = { 'foo': 'bar' }

  t.deepEqual(flagsParser(STRING_INPUT), OUTPUT)
  t.deepEqual(flagsParser(ARRAY_INPUT), OUTPUT)
})

test('Parse a composite flags with integer values', t => {
  const STRING_INPUT = '--number 1'
  const ARRAY_INPUT = ['--number', 1]

  const OUTPUT = { 'number': 1 }

  t.deepEqual(flagsParser(STRING_INPUT), OUTPUT)
  t.deepEqual(flagsParser(ARRAY_INPUT), OUTPUT)
})

test('Parse multiple flags at once', t => {
  const STRING_INPUT = '--foo --bar baz --number 1'
  const ARRAY_INPUT = ['--foo', '--bar', 'baz', '--number', 1]

  const OUTPUT = { 'bar': 'baz', 'foo': true, 'number': 1 }

  t.deepEqual(flagsParser(STRING_INPUT), OUTPUT)
  t.deepEqual(flagsParser(ARRAY_INPUT), OUTPUT)
})

test('Handle multiple values for the same flag', t => {
  const STRING_INPUT = '--foo --bar baz --bar zab --number 1'
  const ARRAY_INPUT = ['--foo', '--bar', 'baz', '--bar', 'zab', '--number', 1]

  const OUTPUT = { 'bar': ['baz', 'zab'], 'foo': true, 'number': 1 }

  t.deepEqual(flagsParser(STRING_INPUT), OUTPUT)
  t.deepEqual(flagsParser(ARRAY_INPUT), OUTPUT)
})
