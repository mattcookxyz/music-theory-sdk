# Music Theory Toolkit

This is a toolkit for note/chord/set parsing, transposition, and enumeration.

This repository is under active development. Help is welcome!

# Installation and Setup

In your node or JavaScript project using NPM ( run `npm init` in a new directory, and follow the prompts ):

```bash
npm i music-theory-toolkit
```

# Usage

### Note

Object Usage

```typescript
import { Note } from 'music-theory-toolkit';

// Generates a random note if not passed an arg,
// calculates numeric, absolute numeric, and frequency values as properties
const randomNote = new Note();

// Parses note, calculates all properties
const parsedNote = new Note('C#5');

// Transpose a number of half-steps (re-calculates all relevant values)
parsedNote.transpose(-12);
```

Static Helpers

```typescript
// Generate an alpha note filtered to only the # value if there is an enharmonic
// For example, if 'C#/Db' (or numeric 1) would have been the output, it will filter to 'C#
const alphaNote = Note.random({ alpha: true, flatSharpFilter: '#' });

// Generate a numeric note between 0 and 11
const numericNote = Note.random(); // => 5

// Transpose a note to the 0-11 range, and adjust octave accordingly
// If no octave is passed, it assumes octave 4 is the baseline
const baselinedNote = Note.baseline(24); // => { numeric: 0, octave: 6 }
```

# Testing and Development

Testing libraries: Mocha & Chai

    npm test
