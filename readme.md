# Music Theory Toolkit

[![codecov](https://codecov.io/gh/mattcookxyz/music-theory-toolkit/branch/master/graph/badge.svg)](https://codecov.io/gh/mattcookxyz/music-theory-toolkit)
[![Actions Status](https://github.com/mattcookxyz/music-theory-toolkit/workflows/Test/badge.svg)](https://github.com/mattcookxyz/music-theory-toolkit/actions)

This is a toolkit for note/chord/set parsing, transposition, and enumeration.

Consider interfaces to be unstable - I'm not strictly following semver until this library hits v1.0.0, but the following might help guide adoption/usage until then:

#### Stable interfaces:
- Note (Class)
- Chord (Class)

#### Not yet implemented interfaces:
- Set (Class)
- Scale (Class)

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

// This class uses the builder pattern, so you can do some pretty crazy things
const buildNote = new Note('C#').transpose(12).transpose(-25).frequency; // => 130.8127826502993 (Hz)
```

Static Helpers

```typescript
import { Note } from 'music-theory-toolkit';

// Generate an alpha note filtered to only the # value if there is an enharmonic
// For example, if 'C#/Db' (or numeric 1) would have been the output, it will filter to 'C#'
const alphaNote = Note.random({ alpha: true, flatSharpFilter: '#' }); // => 'C#'

// Generate a numeric note between 0 and 11
const numericNote = Note.random(); // => 5

// Transpose a note to the 0-11 range, and adjust octave accordingly
// If no octave is passed, it assumes octave 4 is the baseline
const baselinedNote = Note.baseline(24); // => { numeric: 0, octave: 6 }
```

### Chord

Object Usage

```typescript
import { Chord } from 'music-theory-toolkit';

const chord = new Chord(); // Not yet implemented - this throws an error
```

Static Helpers

```typescript
import { Chord } from 'music-theory-toolkit';

// Generate a random chord
const chordOne = Chord.random(); // => 'C#Maj7'
const chordTwo = Chord.random({ flatSharpFilter: false, maxDifficulty: 1 }); // => 'C#/DbMaj'
const chordThree = Chord.random({ maxDifficulty: 5 }); // => 'C#/Dbø7'

// Get a random chord quality object
const qualityOne = Chord.randomQuality({ maxDifficulty: 5 }); // => { difficulty: 1, name: 'Major', symbol: 'Maj', structure: [0, 4, 7] }
const qualityTwo = Chord.randomQuality({ targetDifficulty: 2 }); // => { difficulty: 2, name: 'Augmented', symbol: '+', structure: [0, 4, 8] }
```

# Testing and Development

Testing libraries: Mocha & Chai

    npm test
