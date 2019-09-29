[music-theory-toolkit](../README.md) › [Globals](../globals.md) › [Note](note.md)

# Class: Note

## Hierarchy

* **Note**

## Index

### Constructors

* [constructor](note.md#constructor)

### Properties

* [absolute](note.md#absolute)
* [alpha](note.md#alpha)
* [frequency](note.md#frequency)
* [octave](note.md#octave)
* [value](note.md#value)

### Methods

* [calculate](note.md#private-calculate)
* [getAbsolute](note.md#private-getabsolute)
* [getFrequency](note.md#private-getfrequency)
* [randomize](note.md#randomize)
* [toAlpha](note.md#toalpha)
* [toNumeric](note.md#tonumeric)
* [transpose](note.md#transpose)

## Constructors

###  constructor

\+ **new Note**(`note`: number | string, `octave`: number): *[Note](note.md)*

*Defined in [Note.ts:7](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L7)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`note` | number &#124; string |  Math.floor(Math.random() * 12) |
`octave` | number | 4 |

**Returns:** *[Note](note.md)*

## Properties

###  absolute

• **absolute**: *number*

*Defined in [Note.ts:6](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L6)*

___

###  alpha

• **alpha**: *boolean*

*Defined in [Note.ts:4](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L4)*

___

###  frequency

• **frequency**: *number*

*Defined in [Note.ts:7](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L7)*

___

###  octave

• **octave**: *number*

*Defined in [Note.ts:5](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L5)*

___

###  value

• **value**: *number | string*

*Defined in [Note.ts:3](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L3)*

## Methods

### `Private` calculate

▸ **calculate**(): *this*

*Defined in [Note.ts:33](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L33)*

**Returns:** *this*

___

### `Private` getAbsolute

▸ **getAbsolute**(): *this*

*Defined in [Note.ts:21](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L21)*

**Returns:** *this*

___

### `Private` getFrequency

▸ **getFrequency**(): *this*

*Defined in [Note.ts:16](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L16)*

**Returns:** *this*

___

###  randomize

▸ **randomize**(`flatSharpFilter`: boolean | string): *this*

*Defined in [Note.ts:41](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`flatSharpFilter` | boolean &#124; string |

**Returns:** *this*

___

###  toAlpha

▸ **toAlpha**(): *this*

*Defined in [Note.ts:58](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L58)*

**Returns:** *this*

___

###  toNumeric

▸ **toNumeric**(): *this*

*Defined in [Note.ts:48](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L48)*

**Returns:** *this*

___

###  transpose

▸ **transpose**(`interval`: number): *this*

*Defined in [Note.ts:68](https://github.com/mattcookxyz/music-theory-toolkit/blob/4dd7eb6/src/models/Note.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`interval` | number |

**Returns:** *this*
