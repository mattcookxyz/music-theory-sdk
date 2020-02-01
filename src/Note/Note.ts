import { IRandomNoteOpts } from './Interfaces';
import applyDefaults from '../util/applyDefaults';
import { alphaNotes, alphaToNumeric, numericToAlpha } from './translators';
import { validAlphaNote, validChordWithFilter, validChordWithoutFilter, validNumericNote } from '../util/regex';

export class Note {
  public octave: number;
  public numeric: number;
  public alpha: string;
  public frequency: number;
  public absolute: number;

  constructor(note: string | number = Math.floor(Math.random() * 12)) {
    // Validate note format
    if (!note.toString().toUpperCase().match(validAlphaNote) && !note.toString().toUpperCase().match(validNumericNote)) {
      throw Error(`Note ${note} is invalid - did not match one of the following patterns: ${validAlphaNote} | ${validNumericNote}`);
    }

    // Assemble from input
    if (typeof note === 'number') {
      this.buildFromNumeric(note);
    } else if (typeof note === 'string') {
      this.buildFromAlpha(note);
    }
  }

  // Returns a 'dumb' random note as a number or string depending on options
  public static random = (opts: IRandomNoteOpts = {}) => {

    applyDefaults(opts, {
      alpha: true,
      flatSharpFilter: true,
    });

    // Get initial random numeric note
    let note: number | string = Math.floor(Math.random() * 12);

    // If numeric, convert to alpha note
    if (opts.alpha) {
      note = numericToAlpha.get(note);

      // Apply filter if desired/needed
      if (opts.flatSharpFilter && note.search('/') !== -1) {

        // If true with no filter selected, select a random filter
        const filter: string = opts.flatSharpFilter === true ? ['#', 'b'][Math.floor(Math.random() * 2)] : opts.flatSharpFilter;

        // Validate filter
        if (['#', 'b'].indexOf(filter) === -1) throw Error(`Unsupported filter type ${filter}`);

        // Apply filter
        switch (filter) {
          case '#':
            note = note.split('/')[0];
            break;
          case 'b':
            note = note.split('/')[1];
            break;
        }
      }
    }

    return note;
  }

  public static fromString = (input: string) => {
    const notes = alphaNotes.sort((a, b) => b.length - a.length);

    for (const note of notes) {
      const pos = input.indexOf(note);
      if (pos !== -1) {
        const parsed = input.slice(pos, pos + note.length);
        return new Note(parsed);
      }
    }

    throw Error(`No note could be found in Note.fromString("${input}")`);
  }

  // Takes a numeric note and optionally an octave. It will translate the numeric note to
  // a number from 0-11, and adjust the octave accordingly, so the absolute note remains the same
  // 12 => { numeric: 0, octave: 5 } (equiv. C5)
  // 25 => { numeric: 1, octave: 6 }
  // (12, 5) => { numeric: 0, octave: 6 }
  public static baseline = (note: number, octave?: number) => {
    // Set starting point
    const numeric = note;
    const coalescedOctave = octave || 4;

    // Calculate offsets from base octave
    const octaveOffset = Math.floor(note / 12);
    const targetHalfStepShift = octaveOffset * -12;

    // Return new values
    return {
      numeric: numeric + targetHalfStepShift,
      octave: coalescedOctave + octaveOffset,
    };
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

  // Construct a full note object from numeric input
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

  // Construct a full note object from alphanumeric input
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
