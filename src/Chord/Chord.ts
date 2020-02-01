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
      Chord.validate(chord);
      const { root, quality } = this.parseChord(chord);
      this.root = root;
      this.quality = quality;
      this.flatSharpFilter = this.parseFilter(root.alpha);
    } else {
      this.root = Note.random({ flatSharpFilter: opts.flatSharpFilter });
      this.quality = Chord.randomQuality(opts);
    }
    this.calculate();
  }

  public static validate = (chord: string) => {
    const valid = validChordWithFilter.test(chord) || validChordWithoutFilter.test(chord);
    if (!valid)
      throw Error(`Input "${chord}" is not a valid chord.`);
  }

  public invert = (inversion: number) => {
    if (inversion >= this.notes.length)
      throw Error(`Chord ${this.value} has too few notes for inversion ${inversion}.`);
    this.inversion = inversion;
    this.calculate();
    return this;
  }

  public transpose = (intervalInHalfSteps: number) => {
    for (const note of this.notes)
      note.transpose(intervalInHalfSteps);
    return this;
  }

  public static random = (opts: IChordOpts = {}): Chord => {
    applyDefaults(opts, {
      flatSharpFilter: Filter.random(),
      maxDifficulty: opts.targetDifficulty ? null : 5,
    });

    return new Chord(undefined, opts);
  }

  // Get a random quality object by targetDifficulty or maxDifficulty
  public static randomQuality = (opts: IQualityOpts = {}) => {

    applyDefaults(opts, { maxDifficulty: opts.targetDifficulty ? undefined : 5 });

    // Validate that only one option is provided
    if (opts.maxDifficulty && opts.targetDifficulty)
      throw Error('maxDifficulty and targetDifficulty opts are not compatible with one another.');

    let keys: string[];

    // If maxDifficulty, filter to difficulties <=
    if (opts.maxDifficulty) {
      // Validate maxDifficulty
      if (!/^[1-5]$/.test(opts.maxDifficulty.toString()))
        throw Error(`Difficulty ${opts.maxDifficulty} is not valid. Must be an integer between 1 and 5.`);

      // Filter
      keys = Object.keys(QUALITIES).filter(key => QUALITIES[key].difficulty <= opts.maxDifficulty);
    }

    // If targetDifficulty, filter to difficulties ===
    if (opts.targetDifficulty) {
      // Validate targetDifficulty
      if (!/^[1-5]$/.test(opts.targetDifficulty.toString()))
        throw Error(`Difficulty ${opts.maxDifficulty} is not valid. Must be an integer between 1 and 5.`);

      // Filter
      keys = Object.keys(QUALITIES).filter(key => QUALITIES[key].difficulty === opts.targetDifficulty);
    }

    // Pick a random quality
    return QUALITIES[keys[Math.floor(Math.random() * keys.length)]];
  }

  private calculate = () => {
    this.notes = this.quality.structure.map((tone) => {
      const transposed = tone + this.root.numeric;
      return new Note(transposed, { flatSharpFilter: this.flatSharpFilter });
    });
    if (this.inversion) {
      const fromBass = this.notes.slice(this.inversion);
      const inverted = this.notes.slice(0, this.inversion);
      this.notes = [...fromBass, ...inverted];
      this.value = `${this.root.alpha}${this.quality.symbol}/${this.notes[0].alpha}`;
    } else {
      this.value = this.root.alpha + this.quality.symbol;
    }
  }

  private parseChord = (chord: string): IParsedChord => {
    Chord.validate(chord);

    const root = Note.fromString(chord, { flatSharpFilter: this.flatSharpFilter });
    const remainder = chord.replace(root.alpha, '');
    const quality: IQuality = QUALITIES_BY_SYMBOL[remainder];

    if (!quality)
      throw Error(`Could not map remainder "${remainder}" to quality.`);

    return {
      root,
      quality,
    };
  }

  private parseFilter = (note: string): false | string => {
    const noteArr = note.split('');
    if (noteArr.indexOf('/') !== -1)
      return false;
    if (noteArr.indexOf('#') !== -1)
      return '#';
    if (noteArr.indexOf('b') !== -1)
      return 'b';
  }
}
