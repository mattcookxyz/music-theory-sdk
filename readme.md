# Music Theory Toolkit

**More API documentation is coming soon.**

This is a toolkit for note/chord/set parsing, transposition, and enumeration.

This repository is under active development. Help is welcome!

# Installation and Setup

In your node or JavaScript project using NPM ( run `npm init` in a new directory, and follow the prompts ):

```bash
npm i music-theory-toolkit
```

All methods can be used statically from these imported objects - there is currently no need to instantiate them:

```javascript
import { Note, Chord, Set, Scale } from 'music-theory-toolkit';

const note = Note.numericNoteToAlpha(10, '#');
```

# Usage

There are currently 4 primary classes available, some sharing common functionality. **All class methods are static.**

## **Note**

### **.random( isAlpha = false, flatSharpFilter = false )**

Generates a random note.

<details>
<summary>Arguments...</summary>
<br>

**asAlpha** [ true | false ]: Whether to return an alphanumeric note ( 'C#' v. 1 )

**flatSharpFilter** [ 'b' | '#' ]: If present with one of these values, AND the random note generated contains a modifier ( 'b' or '#' ), then it will use only that type of modifier. I.E. if a 'C#/Db' is generated, it would instead only return 'C#' or 'Db'.
</details>

### **.numericNoteToAlpha( numNote, flatSharpFilter = false )**

Converts a numeric note (10) to alphanumeric ('A#/Bb').

<details>
<summary>Arguments...</summary>
<br>

**numNote** [ number ]: A numeric note to convert. If the value is greater than 11, it will be transposed down however many octaves until it is <= 11.

**flatSharpFilter** [ 'b', '#' ]: If this arg is present with one of these values, AND the note converts to one with a modifier ( 'b' or '#' ), then it will use only that type of modifier. I.E. if a 'C#/Db' results, it will instead only return 'C#' or 'Db'.
</details>
<br>

# Testing and Development

Testing libraries: Mocha & Chai

    npm test