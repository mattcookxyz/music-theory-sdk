import { Note } from './Note';

export class Chord {

  public root: Note;
  public quality: IQuality;
  public notes: Note[];

  // Returns a 'dumb' random chord as a string
  public static random = (opts: IRandomChordOpts = { flatSharpFilter: true, difficulty: 5 }) => {
    // Generate a random alphabetical root
    const root = Note.random({ alpha: true, flatSharpFilter: opts.flatSharpFilter });

    // Generate a random quality
    const quality = Chord.randomQuality().symbol;

    // Concatenate root and quality
    return root + quality;
  }

  // Get a random quality object with a
  public static randomQuality = (opts: IRandomQualityOpts = { maxDifficulty: 5 }) => {
    // Validate that both options are not provided
    if (opts.maxDifficulty && opts.targetDifficulty) {
      throw Error('maxDifficulty and targetDifficulty opts are not compatible with one another.');
    }

    // Validate that at least one option is provided
    if (!opts.maxDifficulty && !opts.targetDifficulty) {
      throw Error('Either maxDifficulty or targetDifficulty opts must be provided with a value between 0 and 5.');
    }

    let keys: string[];

    // If maxDifficulty, filter to difficulties <=
    if (opts.maxDifficulty) {
      // Validate maxDifficulty
      if (!opts.maxDifficulty.toString().match(/[1-5]/gm)) {
        throw Error(`Difficulty ${opts.maxDifficulty} is not valid. Must be an integer between 1 and 5.`);
      }
      // Filter
      keys = Object.keys(qualities).filter(key => qualities[key].difficulty <= opts.maxDifficulty);
    }

    // If targetDifficulty, filter to difficulties ===
    if (opts.targetDifficulty) {
      // Validate maxDifficulty
      if (!opts.targetDifficulty.toString().match(/[1-5]/gm)) {
        throw Error(`Difficulty ${opts.maxDifficulty} is not valid. Must be an integer between 1 and 5.`);
      }
      // Filter
      keys = Object.keys(qualities).filter(key => qualities[key].difficulty === opts.targetDifficulty);
    }

    // Pick a random quality
    return qualities[keys[Math.floor(Math.random() * keys.length)]];
  }

  constructor(chord = Chord.random()) {
    throw Error('Chord class not implemented. Try static method Chord.random(); in the meantime. :)');
  }
}

interface IRandomChordOpts {
  flatSharpFilter?: boolean|string;
  difficulty?: number;
}

interface IRandomQualityOpts {
  targetDifficulty?: number;
  maxDifficulty?: number;
}

interface IQuality {
  difficulty: number;
  name: string;
  symbol: string;
  structure: number[];
}

export const qualities: {
  [index: string]: IQuality,
} = {
    // Basic qualities
  major: {
    difficulty: 1,
    name: 'Major',
    symbol: 'Maj',
    structure: [0, 4, 7],
  },
  minor: {
    difficulty: 1,
    name: 'Minor',
    symbol: 'm',
    structure: [0, 3, 7],
  },
  diminished: {
    difficulty: 1,
    name: 'Diminished',
    symbol: '°',
    structure: [0, 3, 6],
  },

    // Basic+ qualities
  augmented: {
    difficulty: 2,
    name: 'Augmented',
    symbol: '+',
    structure: [0, 4, 8],
  },
  sus2: {
    difficulty: 2,
    name: 'Suspended 2nd',
    symbol: 'sus2',
    structure: [0, 2, 7],
  },
  sus4: {
    difficulty: 2,
    name: 'Suspended 4th',
    symbol: 'sus4',
    structure: [0, 5, 7],
  },
  dominant7: {
    difficulty: 2,
    name: 'Dominant 7th',
    symbol: '7',
    structure: [0, 4, 7, 10],
  },

    // Intermediate qualities
  major7: {
    difficulty: 3,
    name: 'Major 7th',
    symbol: 'Maj7',
    structure: [0, 4, 7, 11],
  },
  minor7: {
    difficulty: 3,
    name: 'Minor 7th',
    symbol: 'm7',
    structure: [0, 3, 7, 10],
  },
  dim7: {
    difficulty: 3,
    name: 'Diminished 7th',
    symbol: '°7',
    structure: [0, 3, 6, 9],
  },
  halfDim7: {
    difficulty: 3,
    name: 'Half Diminished 7th',
    symbol: 'ø7',
    structure: [0, 3, 6, 10],
  },
  major9: {
    difficulty: 3,
    name: 'Major 9th',
    symbol: 'Maj9',
    structure: [0, 4, 7, 11, 14],
  },
  minor9: {
    difficulty: 3,
    name: 'Minor 9th',
    symbol: 'm9',
    structure: [0, 3, 7, 10, 14],
  },
  dominant9: {
    difficulty: 3,
    name: 'Dominant 9th',
    symbol: '7',
    structure: [0, 4, 7, 10, 14],
  },

    // Advanced qualities
    // Experimental qualities
};
