[music-theory-toolkit](README.md) › [Globals](globals.md)

# music-theory-toolkit

## Index

### Classes

* [Note](classes/note.md)

### Variables

* [alphaToNumeric](globals.md#const-alphatonumeric)
* [numericToAlpha](globals.md#const-numerictoalpha)

### Functions

* [getRandom](globals.md#const-getrandom)

## Variables

### `Const` alphaToNumeric

• **alphaToNumeric**: *Map‹string, number›* =  new Map([
  ['C', 0],
  ['C#', 1],
  ['Db', 1],
  ['C#/Db', 1],
  ['D', 2],
  ['D#', 3],
  ['Eb', 3],
  ['D#/Eb', 3],
  ['E', 4],
  ['F', 5],
  ['F#', 6],
  ['Gb', 6],
  ['F#/Gb', 6],
  ['G', 7],
  ['G#', 8],
  ['Ab', 8],
  ['G#/Ab', 8],
  ['A', 9],
  ['A#', 10],
  ['Bb', 10],
  ['A#/Bb', 10],
  ['B', 11]
])

*Defined in [Note.ts:144](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L144)*

___

### `Const` numericToAlpha

• **numericToAlpha**: *Map‹number, string›* =  new Map([
  [0, 'C'],
  [1, 'C#/Db'],
  [2, 'D'],
  [3, 'D#/Eb'],
  [4, 'E'],
  [5, 'F'],
  [6, 'F#/Gb'],
  [7, 'G'],
  [8, 'G#/Ab'],
  [9, 'A'],
  [10, 'A#/Bb'],
  [11, 'B']
])

*Defined in [Note.ts:129](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L129)*

## Functions

### `Const` getRandom

▸ **getRandom**(`alpha`: boolean, `flatSharpFilter`: boolean | string): *string | number*

*Defined in [Note.ts:103](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L103)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`alpha` | boolean | false |
`flatSharpFilter` | boolean &#124; string | false |

**Returns:** *string | number*
