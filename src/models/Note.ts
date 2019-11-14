export class Note {
  public octave: number;
  public numeric: number;
  public alpha: string;
  public frequency: number;
  public absolute: number;

  // Returns a 'dumb' random chord as a number or string depending on options
  public static random = (opts: IRandomNoteOpts = {}) => {
    // Get initial random numeric note
    let note: number|string = Math.floor(Math.random() * 12);

    // If numeric, convert to alpha note
    if (opts.alpha) {
      note = numericToAlpha.get(note);

      // Apply filter if desired/needed
      if (opts.flatSharpFilter && note.search('/') !== -1) {
        switch(opts.flatSharpFilter) {
          case '#':
            note = note.split('/')[0];
            break;
          case 'b':
            note = note.split('/')[1];
            break;
          default:
            break;
        }
      }
    }

    return note;
  }

  // Takes a numeric note and optionally an octave. It will translate the numeric note to
  // a number from 0-11, and adjust the octave accordingly, so the absolute note remains the same
  // 12 => { numeric: 0, octave: 5 } (equiv. C5)
  // 25 => { numeric: 1, octave: 6 }
  // (12, 5) => { numeric: 0, octave: 6 }
  public static baseline = (note: number, octave?: number) => {
    // Set starting point
    let numeric = note;
    let coalescedOctave = octave || 4;

    // Calculate offsets from base octave
    let octaveOffset = Math.floor(note / 12);
    let targetHalfStepShift = octaveOffset * -12;

    // Return new values
    return {
      numeric: numeric + targetHalfStepShift,
      octave: coalescedOctave + octaveOffset
    }
  }

  constructor(note: string|number = Math.floor(Math.random() * 12)) {
    // Valid note patterns
    const alphaRegex = /^[A-Ga-g]{1}[#|b]?[0-9]{0,2}/gm;
    const numericRegex = /^-?[0-9]*$/gm;

    // Validate that input is a valid note format
    if (!note.toString().toUpperCase().match(alphaRegex) && !note.toString().toUpperCase().match(numericRegex)) {
      throw Error(`Note ${note} is invalid - did not match pattern: ${alphaRegex}`);
    }

    // Assemble from input
    if (typeof note === 'number') {
      this.buildFromNumeric(note);
    } else if (typeof note === 'string') {
      this.buildFromAlpha(note);
    } else {
      throw Error(`Input note type ${typeof note} not supported.`);
    }
  }

  // Transposes the note object up or down by a number of half steps and recalculates attributes
  public transpose = (intervalInHalfSteps: number) => {
    // Get baseline values for transposed note
    const { numeric, octave } = Note.baseline(this.numeric + intervalInHalfSteps, this.octave);

    // Set new values
    this.numeric = numeric;
    this.octave = octave;
    this.alpha = numericToAlpha.get(numeric);

    // Calculate absolute and frequency values
    this.calculate();

    return this;
  }

  private buildFromNumeric = (note: number) => {
    // Calculate offsets from base octave
    const { numeric, octave } = Note.baseline(note, 4);

    // Assign to object
    this.numeric = numeric;
    this.octave = octave;

    // Get alpha note from numeric value
    this.alpha = numericToAlpha.get(this.numeric);

    // Calculate absolute value and frequency
    this.calculate();
  }

  private buildFromAlpha = (note: string) => {
    let noteOnly: string;
    let octaveOnly: number;

    const octaveIndex = note.search(/[0-9]/g);

    if (octaveIndex !== -1) {
      noteOnly = note.slice(0, octaveIndex);
      octaveOnly = parseInt(note.slice(octaveIndex));
    } else {
      noteOnly = note;
      octaveOnly = 4;
    }

    this.alpha = noteOnly;
    this.numeric = alphaToNumeric.get(noteOnly);
    this.octave = octaveOnly;

    this.calculate();
  }

  private calculate() {
    // Calculate and assign absolute value of note
    this.absolute = this.numeric + (12 * this.octave);

    // Calculate and assign frequency
    this.frequency = 440 * Math.pow(2, (this.absolute - 57) / 12);
  }
}

interface IRandomNoteOpts {
  alpha?: boolean;
  flatSharpFilter?: boolean|string;
}

const numericToAlpha = new Map([
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
]);

const alphaToNumeric = new Map([
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
]);
