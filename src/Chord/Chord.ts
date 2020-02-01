import { Note } from '../Note/Note';
import applyDefaults from '../util/applyDefaults';
import { IParsedChord, IQuality, IChordOpts, IQualityOpts } from './Interfaces';
import { QUALITIES, QUALITIES_BY_SYMBOL } from './qualities';
import { validChordWithFilter, validChordWithoutFilter } from '../util/regex';
import Filter from '../util/Filter';

export class Chord {

  public root: Note;
  public quality: IQuality;
  public notes: Note[];
  public value: string;
  public inversion: number;
  public flatSharpFilter: false | string;

  constructor(chord?: string, opts: IChordOpts = {}) {
    if (chord) {
      // If a chord was provided, validate, parse,
      // and use # / b filter based on provided chord root
      Chord.validate(chord);
      const { root, quality } = this.parseChord(chord);
      this.root = root;
      this.quality = quality;
      this.flatSharpFilter = this.parseFilter(root.alpha);
    } else {
      // If a chord wasn't provided, generate a random chord
      this.root = Note.random({ flatSharpFilter: opts.flatSharpFilter });
      this.quality = Chord.randomQuality(opts);
    }
    // Calculate inversion, notes from root/quality, and
    // value - i.e., the chord represented as a string
    this.calculate();
  }

  /**********
   * STATIC *
   *********/

  public static validate = (chord: string) => {
    const valid = validChordWithFilter.test(chord) || validChordWithoutFilter.test(chord);
    if (!valid)
      throw Error(`Input "${chord}" is not a valid chord.`);
  }

  public static random = (opts: IChordOpts = {}): Chord => {
    // Get a random chord object
    applyDefaults(opts, {
      flatSharpFilter: Filter.random(),
      maxDifficulty: opts.targetDifficulty ? null : 5,
    });

    return new Chord(undefined, opts);
  }

  public static randomQuality = (opts: IQualityOpts = {}) => {
    // Get a random quality object by targetDifficulty or maxDifficulty
    applyDefaults(opts, {
      maxDifficulty: opts.targetDifficulty ? undefined : 5,
    });

    // Validate that maxDifficulty and targetDifficulty
    // were not both provided in opts
    if (opts.maxDifficulty && opts.targetDifficulty)
      throw Error('maxDifficulty and targetDifficulty opts are not compatible with one another.');

    let filteredChords: string[];

    // If maxDifficulty, filter to difficulties less than or equal
    if (opts.maxDifficulty) {
      // Validate maxDifficulty
      if (!/^[1-5]$/.test(opts.maxDifficulty.toString()))
        throw Error(`Difficulty ${opts.maxDifficulty} is not valid. Must be an integer between 1 and 5.`);
      // Filter
      filteredChords = Object.keys(QUALITIES).filter(key => QUALITIES[key].difficulty <= opts.maxDifficulty);
    }

    // If targetDifficulty, filter to only that difficulty
    if (opts.targetDifficulty) {
      // Validate targetDifficulty
      if (!/^[1-5]$/.test(opts.targetDifficulty.toString()))
        throw Error(`Difficulty ${opts.maxDifficulty} is not valid. Must be an integer between 1 and 5.`);
      // Filter
      filteredChords = Object.keys(QUALITIES).filter(key => QUALITIES[key].difficulty === opts.targetDifficulty);
    }

    // Pick a random quality object
    return QUALITIES[filteredChords[Math.floor(Math.random() * filteredChords.length)]];
  }

  /**********
   * PUBLIC *
   *********/

  public invert = (inversion: number) => {
    // A 3 note chord only has 2 inversions - verify
    // that the inversion specified is valid
    if (inversion >= this.notes.length)
      throw Error(`Chord ${this.value} has too few notes for inversion ${inversion}.`);
    // Apply and calculate
    this.inversion = inversion;
    this.calculate();
    return this;
  }

  public transpose = (intervalInHalfSteps: number) => {
    // Transpose each note by the number of half steps provided
    for (const note of this.notes)
      note.transpose(intervalInHalfSteps);
    return this;
  }

  /***********
   * PRIVATE *
   **********/

  private calculate = () => {
    // Calculate chord members from root/quality
    this.notes = this.quality.structure.map((tone) => {
      const transposed = tone + this.root.numeric;
      return new Note(transposed, { flatSharpFilter: this.flatSharpFilter });
    });

    // Process inversion
    if (this.inversion) {
      const fromBass = this.notes.slice(this.inversion);
      const inverted = this.notes.slice(0, this.inversion);
      this.notes = [...fromBass, ...inverted];
      // Calculate value, or string representation
      this.value = `${this.root.alpha}${this.quality.symbol}/${this.notes[0].alpha}`;
    } else {
      // Calculate value, or string representation
      this.value = this.root.alpha + this.quality.symbol;
    }
  }

  private parseChord = (chord: string): IParsedChord => {
    // Get root and quality objects from a string
    Chord.validate(chord);

    const root = Note.fromString(chord, { flatSharpFilter: this.flatSharpFilter });
    const remainder = chord.replace(root.alpha, '');
    const quality: IQuality = QUALITIES_BY_SYMBOL[remainder];

    // Quality is unknown
    if (!quality)
      throw Error(`Could not map remainder "${remainder}" to quality.`);

    return {
      root,
      quality,
    };
  }

  private parseFilter = (note: string): false | string => {
    // If only a sharp/flat note was specified in the constructor,
    // use that filter for all relevant calculations/notes
    const noteArr = note.split('');
    if (noteArr.indexOf('/') !== -1)
      return false;
    if (noteArr.indexOf('#') !== -1)
      return '#';
    if (noteArr.indexOf('b') !== -1)
      return 'b';
  }
}
