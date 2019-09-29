import { Note } from './Note';
import { Set } from './Set';
import { sortBy, find, isEqual, uniq } from 'lodash';

export class Chord {

  public root: Note;
  public notes: Note[];
  public quality: IQuality;

  constructor(notes?: Note[]) {
    if (notes) {
      this.notes = sortBy(notes, note => note.absolute);
      this.root = this.notes[0];
      const rootAbsolute = this.root.absolute;
      const baselined = uniq(this.notes.map(note => note.absolute - rootAbsolute));
      this.quality = find(qualities, (val) => {
        return isEqual(val, baselined);
      });
    }
  }

  public generate(
    root: Note|string|number = new Note(),
    quality: string|IQuality = randomQuality()) {
    if (root instanceof Note) {
      this.root = root;
    } else if (typeof root === 'string' || typeof root === 'number') {
      this.root = new Note(root);
    }
    if (typeof quality === 'string') {
      this.quality = qualities[quality];
    } else {
      this.quality = quality;
    }
    this.notes = applyStructureToRoot(this.root, this.quality.structure);
    return this;
  }

  public static generate(
    root?: Note|string|number,
    quality?: string|IQuality) {
    return new Chord().generate(root, quality);
  }
}

export const randomQuality = () => {
  const keys = Object.keys(qualities);
  const index: string|number = Math.floor(Math.random() * keys.length);
  // @ts-ignore
  return qualities[keys[index]];
};

export const applyStructureToRoot = (root: number|string|Note, structure: number[]) => {
  let rootNote: Note;
  const applied: Note[] = [];
  if (!(root instanceof Note)) {
    rootNote = new Note(root);
  } else {
    rootNote = root;
  }
  for (let i = 0; i < structure.length; i += 1) {
    applied.push(new Note(rootNote.numeric).transpose(structure[i]));
  }
  return applied;
};

export interface IQuality {
  difficulty: number;
  type: string;
  symbol: string;
  structure: number[];
}

export const qualities: { [index: string]: IQuality } = {

  // Basic qualities

  major: {
    difficulty: 0,
    type: 'Major',
    symbol: 'Maj',
    structure: [0, 4, 7],
  },
  minor: {
    difficulty: 0,
    type: 'Minor',
    symbol: 'm',
    structure: [0, 3, 7],
  },
  diminished: {
    difficulty: 0,
    type: 'Diminished',
    symbol: '°',
    structure: [0, 3, 6],
  },

  // Basic+ qualities

  augmented: {
    difficulty: 1,
    type: 'Augmented',
    symbol: '+',
    structure: [0, 4, 8],
  },
  sus2: {
    difficulty: 1,
    type: 'Suspended 2nd',
    symbol: 'sus2',
    structure: [0, 2, 7],
  },
  sus4: {
    difficulty: 1,
    type: 'Suspended 4th',
    symbol: 'sus4',
    structure: [0, 5, 7],
  },
  dominant7: {
    difficulty: 1,
    type: 'Dominant 7th',
    symbol: '7',
    structure: [0, 4, 7, 10],
  },

  // Intermediate qualities

  major7: {
    difficulty: 2,
    type: 'Major 7th',
    symbol: 'Maj7',
    structure: [0, 4, 7, 11],
  },
  minor7: {
    difficulty: 2,
    type: 'Minor 7th',
    symbol: 'm7',
    structure: [0, 4, 7, 11],
  },
  dim7: {
    difficulty: 2,
    type: 'Diminished 7th',
    symbol: '°7',
    structure: [0, 3, 6, 9],
  },
  halfdim7: {
    difficulty: 2,
    type: 'Half Diminished 7th',
    symbol: 'ø7',
    structure: [0, 3, 6, 10],
  },
  major9: {
    difficulty: 2,
    type: 'Major 9th',
    symbol: 'Maj9',
    structure: [0, 4, 7, 11, 14],
  },
  minor9: {
    difficulty: 2,
    type: 'Minor 9th',
    symbol: 'm9',
    structure: [0, 3, 7, 10, 14],
  },
  dominant9: {
    difficulty: 2,
    type: 'Dominant 9th',
    symbol: '7',
    structure: [0, 4, 7, 10, 14],
  },

  // Advanced qualities

  // Experimental qualities
};
