import { Note } from './Note';

export class Chord {

  public root: Note;
  public notes: Note[];
  public quality: IQuality;

  // Returns a 'dumb' random chord as a string
  public static random = (opts: IRandomChordOpts = {}) => {
    const root = Note.random({ alpha: true, flatSharpFilter: true });
    const qualityKeys = Object.keys(qualities);
    const quality = qualities[qualityKeys[Math.floor(Math.random() * qualityKeys.length)]].symbol;
    return root + quality;
  }

  constructor(chord = Chord.random()) {
    throw Error('Chord class not implemented. Try static method Chord.random(); in the meantime. :)');
  }
}

interface IRandomChordOpts {}

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
    difficulty: 0,
    name: 'Major',
    symbol: 'Maj',
    structure: [0, 4, 7],
  },
  minor: {
    difficulty: 0,
    name: 'Minor',
    symbol: 'm',
    structure: [0, 3, 7],
  },
  diminished: {
    difficulty: 0,
    name: 'Diminished',
    symbol: '°',
    structure: [0, 3, 6],
  },

    // Basic+ qualities
  augmented: {
    difficulty: 1,
    name: 'Augmented',
    symbol: '+',
    structure: [0, 4, 8],
  },
  sus2: {
    difficulty: 1,
    name: 'Suspended 2nd',
    symbol: 'sus2',
    structure: [0, 2, 7],
  },
  sus4: {
    difficulty: 1,
    name: 'Suspended 4th',
    symbol: 'sus4',
    structure: [0, 5, 7],
  },
  dominant7: {
    difficulty: 1,
    name: 'Dominant 7th',
    symbol: '7',
    structure: [0, 4, 7, 10],
  },

    // Intermediate qualities
  major7: {
    difficulty: 2,
    name: 'Major 7th',
    symbol: 'Maj7',
    structure: [0, 4, 7, 11],
  },
  minor7: {
    difficulty: 2,
    name: 'Minor 7th',
    symbol: 'm7',
    structure: [0, 3, 7, 10],
  },
  dim7: {
    difficulty: 2,
    name: 'Diminished 7th',
    symbol: '°7',
    structure: [0, 3, 6, 9],
  },
  halfDim7: {
    difficulty: 2,
    name: 'Half Diminished 7th',
    symbol: 'ø7',
    structure: [0, 3, 6, 10],
  },
  major9: {
    difficulty: 2,
    name: 'Major 9th',
    symbol: 'Maj9',
    structure: [0, 4, 7, 11, 14],
  },
  minor9: {
    difficulty: 2,
    name: 'Minor 9th',
    symbol: 'm9',
    structure: [0, 3, 7, 10, 14],
  },
  dominant9: {
    difficulty: 2,
    name: 'Dominant 9th',
    symbol: '7',
    structure: [0, 4, 7, 10, 14],
  },

    // Advanced qualities
    // Experimental qualities
};
