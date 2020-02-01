import { INoteOpts, IRandomNoteOpts } from './Interfaces';
import applyDefaults from '../util/applyDefaults';
import { alphaNotes, alphaToNumeric, numericToAlpha } from './translators';
import { validAlphaNote, validNumericNote } from '../util/regex';
import Filter from '../util/Filter';

export class Note {
  public octave: number;
  public numeric: number;
  public alpha: string;
  public frequency: number;
  public absolute: number;
  public flatSharpFilter: false | string;

  constructor(note: string | number = Math.floor(Math.random() * 12), opts: INoteOpts = {}) {
    Note.validate(note);

    if (opts.flatSharpFilter) {
      Filter.validate(opts.flatSharpFilter);
      this.flatSharpFilter = opts.flatSharpFilter;
    }

    applyDefaults(opts, {
      flatSharpFilter: Filter.random(),
    });

    // Assemble from input
    if (typeof note === 'number') {
      this.buildFromNumeric(note);
    } else if (typeof note === 'string') {
      this.buildFromAlpha(note);
    }
  }

  public static validate = (note: string | number) => {
    const valid = validNumericNote.test(note.toString().toUpperCase()) || validAlphaNote.test(note.toString().toUpperCase());
    if (!valid) {
      throw Error(`Input "${note}" is not a valid note.`);
    }
  }

  // Returns a random note
  public static random = (opts: IRandomNoteOpts = {}): Note => {
    applyDefaults(opts, {
      flatSharpFilter: Filter.random(),
    });

    return new Note(undefined, { flatSharpFilter: opts.flatSharpFilter });
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
    this.applyFilter();
    this.calculateAbsolute();
    this.calculateFrequency();
  }

  private applyFilter() {
    if (this.flatSharpFilter && this.alpha.indexOf('/') !== -1) {
      // Apply filter
      switch (this.flatSharpFilter) {
        case '#':
          this.alpha = this.alpha.split('/')[0];
          break;
        case 'b':
          this.alpha = this.alpha.split('/')[1];
          break;
      }
    }
  }

  private calculateAbsolute() {
    this.absolute = this.numeric + (12 * this.octave);
  }

  private calculateFrequency() {
    this.frequency = 440 * Math.pow(2, (this.absolute - 57) / 12);
  }
}
