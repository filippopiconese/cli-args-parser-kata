# cli-args-parser-kata

Kata exercise which regards how to parse a cli input

## How to run the program

```
node ./bin/run <input>
```

or

```
npm start
```

## Allowed input

It's possible to give as input a string which has one of the following structures:

* '--foo' || ['--foo']

* '--foo bar' || ['--foo', 'bar']

* '--foo 3000' || ['--number', 1]

* '--foo --bar baz --number 1' || ['--foo', '--bar', 'baz', '--number', 1]

* --foo --bar baz --bar zab --number 1 || ['--foo', '--bar', 'baz', '--bar', 'zab', '--number', 1]