import { Note } from '../Note/Note';
import applyDefaults from '../util/applyDefaults';
import { IParsedChord, IQuality, IRandomChordOpts, IRandomQualityOpts, IStaticRandomChordResult } from './Interfaces';
import { QUALITIES, QUALITIES_BY_SYMBOL } from './qualities';
import { validChordWithFilter, validChordWithoutFilter } from '../util/regex';

export class Chord {

  public root: Note;
  public quality: IQuality;
  public notes: Note[];

  constructor(chord: string = Chord.random().value) {
    throw Error('Chord class not implemented. Try static method Chord.random(); in the meantime. :)');
  }

  // Returns a somewhat 'dumb' random chord
  public static random = (opts: IRandomChordOpts = {}): IStaticRandomChordResult => {

    applyDefaults(opts, {
      flatSharpFilter: true,
      maxDifficulty: 5,
      destructure: false,
      alpha: true,
    });

    const root = Note.random({ alpha: opts.alpha, flatSharpFilter: opts.flatSharpFilter });
    const quality = Chord.randomQuality({ maxDifficulty: opts.maxDifficulty });

    // Destructure into separate root and quality if requested
    if (opts.destructure) {
      return {
        root,
        quality,
        value: root + quality.symbol,
      };
    }

    return {
      value: root + quality.symbol,
    };
  }

  // Get a random quality object by targetDifficulty or maxDifficulty
  public static randomQuality = (opts: IRandomQualityOpts = {}) => {

    applyDefaults(opts, { maxDifficulty: opts.targetDifficulty ? undefined : 5 });

    // Validate that only one option is provided
    if (opts.maxDifficulty && opts.targetDifficulty) {
      throw Error('maxDifficulty and targetDifficulty opts are not compatible with one another.');
    }

    let keys: string[];

    // If maxDifficulty, filter to difficulties <=
    if (opts.maxDifficulty) {
      // Validate maxDifficulty
      if (!/^[1-5]$/.test(opts.maxDifficulty.toString())) {
        throw Error(`Difficulty ${opts.maxDifficulty} is not valid. Must be an integer between 1 and 5.`);
      }
      // Filter
      keys = Object.keys(QUALITIES).filter(key => QUALITIES[key].difficulty <= opts.maxDifficulty);
    }

    // If targetDifficulty, filter to difficulties ===
    if (opts.targetDifficulty) {
      // Validate targetDifficulty
      if (!/^[1-5]$/.test(opts.targetDifficulty.toString())) {
        throw Error(`Difficulty ${opts.maxDifficulty} is not valid. Must be an integer between 1 and 5.`);
      }
      // Filter
      keys = Object.keys(QUALITIES).filter(key => QUALITIES[key].difficulty === opts.targetDifficulty);
    }

    // Pick a random quality
    return QUALITIES[keys[Math.floor(Math.random() * keys.length)]];
  }

  public static parseChord = (chord: string): IParsedChord => {
    if (!validChordWithFilter.test(chord) && !validChordWithoutFilter.test(chord)) {
      throw Error(`Input "${chord}" cannot be parsed as a chord.`);
    }

    const root = Note.fromString(chord);
    const remainder = chord.replace(root.alpha, '');
    const quality: IQuality = QUALITIES_BY_SYMBOL[remainder];

    if (!quality) {
      throw Error(`Could not map remainder ${remainder} to quality.`);
    }

    return {
      root,
      quality,
    };
  }
}
