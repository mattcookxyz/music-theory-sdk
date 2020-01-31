import { Note } from '../Note/Note';
import applyDefaults from '../util/applyDefaults';
import { IQuality, IRandomChordOpts, IRandomQualityOpts, IStaticRandomChordResult } from './Interfaces';
import { QUALITIES } from './qualities';

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
      if (!opts.maxDifficulty.toString().match(/^[1-5]$/g)) {
        throw Error(`Difficulty ${opts.maxDifficulty} is not valid. Must be an integer between 1 and 5.`);
      }
      // Filter
      keys = Object.keys(QUALITIES).filter(key => QUALITIES[key].difficulty <= opts.maxDifficulty);
    }

    // If targetDifficulty, filter to difficulties ===
    if (opts.targetDifficulty) {
      // Validate targetDifficulty
      if (!opts.targetDifficulty.toString().match(/^[1-5]$/g)) {
        throw Error(`Difficulty ${opts.maxDifficulty} is not valid. Must be an integer between 1 and 5.`);
      }
      // Filter
      keys = Object.keys(QUALITIES).filter(key => QUALITIES[key].difficulty === opts.targetDifficulty);
    }

    // Pick a random quality
    return QUALITIES[keys[Math.floor(Math.random() * keys.length)]];
  }
}
