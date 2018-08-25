import test from 'ava'

const flagsParser = require('../index')

test('', t => {
  t.deepEqual(flagsParser(''), {})
})
