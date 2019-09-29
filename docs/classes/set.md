[music-theory-toolkit](../README.md) › [Set](set.md)

# Class: Set

## Hierarchy

* **Set**

## Index

### Constructors

* [constructor](set.md#constructor)

### Properties

* [alpha](set.md#alpha)
* [notes](set.md#notes)
* [order](set.md#order)
* [ordered](set.md#ordered)

### Methods

* [add](set.md#add)
* [remove](set.md#remove)
* [shuffle](set.md#shuffle)
* [sortAscending](set.md#sortascending)
* [sortDescending](set.md#sortdescending)

## Constructors

###  constructor

\+ **new Set**(`length`: number, `random`: boolean): *[Set](set.md)*

Defined in models/Set.ts:9

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`length` | number | 0 |
`random` | boolean | false |

**Returns:** *[Set](set.md)*

## Properties

###  alpha

• **alpha**: *boolean*

Defined in models/Set.ts:7

___

###  notes

• **notes**: *[Note](note.md)[]*

Defined in models/Set.ts:6

___

###  order

• **order**: *string | null*

Defined in models/Set.ts:9

___

###  ordered

• **ordered**: *boolean*

Defined in models/Set.ts:8

## Methods

###  add

▸ **add**(`count`: number): *this*

Defined in models/Set.ts:51

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`count` | number | 1 |

**Returns:** *this*

___

###  remove

▸ **remove**(`count`: number): *this*

Defined in models/Set.ts:68

**Parameters:**

Name | Type |
------ | ------ |
`count` | number |

**Returns:** *this*

___

###  shuffle

▸ **shuffle**(): *this*

Defined in models/Set.ts:30

**Returns:** *this*

___

###  sortAscending

▸ **sortAscending**(): *this*

Defined in models/Set.ts:37

**Returns:** *this*

___

###  sortDescending

▸ **sortDescending**(): *this*

Defined in models/Set.ts:44

**Returns:** *this*
