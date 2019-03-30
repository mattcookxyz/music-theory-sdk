import { filter as lodashFilter } from 'lodash';
import Note from './Note';
import Set from './Set';

/**
 * This is the Chord class
 * @class
 */
export default class Chord {
  /**
   * Provides a random chord of the given difficulty (or below)
   * @param {number} difficulty - 0-4 - difficulty of chord candidates
   * @param {boolean} exclusively - Whether or not to constrain to the given difficulty, or allow easier chord qualities
   * @param {boolean} constrainToBaseOctave - Whether to keep notes within base octave [ 0 - 11 ]
   * @param {boolean|string} flatSharpFilter - Whether to constrain the output root to # or b for alphaChord
   */
  static random(
    difficulty = 5,
    exclusively = false,
    constrainToBaseOctave = true,
    flatSharpFilter = false
  ) {
    const qualities = Chord.allQualitiesWithDifficulty(difficulty, exclusively);
    const quality = qualities[Math.floor(Math.random() * qualities.length)];
    const root = Note.random();
    const alphaChord =
      Note.numericNoteToAlpha(root, flatSharpFilter) + quality.symbol;
    const numericChord = this.applyStructureToRoot(
      root,
      quality.structure,
      constrainToBaseOctave
    );
    return {
      root,
      quality,
      alphaChord,
      numericChord
    };
  }

  /**
   * Provides a random chord quality of the given difficulty (or below)
   * @param {number} difficulty - 0-4 - difficulty of chord candidates
   * @param {boolean} exclusively - Whether or not to constrain to the given difficulty, or allow easier qualities
   */
  static randomQuality(difficulty = 5, exclusively = false) {
    const qualities = Chord.allQualitiesWithDifficulty(difficulty, exclusively);
    return qualities[Math.floor(Math.random() * qualities.length)];
  }

  /**
   * Get all qualities of given difficulty (including lower difficulties by default, per the exclusively arg)
   * @param {string} difficulty - 0 through 4 - difficulty of chord qualities to include (up to and including)
   * @param {boolean} exclusively - If true, the function only returns qualities of this difficulty level
   */
  static allQualitiesWithDifficulty(difficulty = 4, exclusively = false) {
    return lodashFilter(Chord.allQualities(), quality => {
      if (exclusively) {
        // If onlyThisDifficulty is true, only return qualities of this difficulty
        return quality.difficulty === difficulty;
      } else {
        // Else return qualities up to and including this difficulty
        return quality.difficulty <= difficulty;
      }
    });
  }

  /**
   * Takes in a root note, and returns the given structure built from the root
   * @param {number|string} root - Numeric note 0-11 or alphabetical note to build chord
   * @param {number[]} structure - Array of chord members as chromatic integers from 0 as root
   * @param {boolean} constrainToBaseOctave - Whether to allow notes to extend beyond 11, or transpose to base octave
   * @param {boolean} isAlpha - Whether to return in as alphabetical chord members or numeric
   * @param {boolean|string} flatSharpFilter - Whether to constrain the output root to # or b for alphaChord
   */
  static applyStructureToRoot(
    root,
    structure,
    constrainToBaseOctave = true,
    isAlpha = false,
    flatSharpFilter = false
  ) {
    const numeric = Set.applyStructureToRoot(
      root,
      structure,
      constrainToBaseOctave
    );
    if (isAlpha) {
      const alpha = numeric.map(numericNote => {
        return Note.numericNoteToAlpha(numericNote, flatSharpFilter);
      });
      return alpha;
    } else {
      return numeric;
    }
  }

  /**
   * Comprehensive list of chord qualities
   */
  static allQualities() {
    return {
      // Basic qualities

      major: {
        difficulty: 0,
        type: 'Major',
        symbol: 'Maj',
        structure: [0, 4, 7]
      },
      minor: {
        difficulty: 0,
        type: 'Minor',
        symbol: 'm',
        structure: [0, 3, 7]
      },
      diminished: {
        difficulty: 0,
        type: 'Diminished',
        symbol: '°',
        structure: [0, 3, 6]
      },

      // Basic+ qualities

      augmented: {
        difficulty: 1,
        type: 'Augmented',
        symbol: '+',
        structure: [0, 4, 8]
      },
      sus2: {
        difficulty: 1,
        type: 'Suspended 2nd',
        symbol: 'sus2',
        structure: [0, 2, 7]
      },
      sus4: {
        difficulty: 1,
        type: 'Suspended 4th',
        symbol: 'sus4',
        structure: [0, 5, 7]
      },
      dominant7: {
        difficulty: 1,
        type: 'Dominant 7th',
        symbol: '7',
        structure: [0, 4, 7, 10]
      },

      // Intermediate qualities

      major7: {
        difficulty: 2,
        type: 'Major 7th',
        symbol: 'Maj7',
        structure: [0, 4, 7, 11]
      },
      minor7: {
        difficulty: 2,
        type: 'Minor 7th',
        symbol: 'm7',
        structure: [0, 4, 7, 11]
      },
      dim7: {
        difficulty: 2,
        type: 'Diminished 7th',
        symbol: '°7',
        structure: [0, 3, 6, 9]
      },
      halfdim7: {
        difficulty: 2,
        type: 'Half Diminished 7th',
        symbol: 'ø7',
        structure: [0, 3, 6, 10]
      },
      major9: {
        difficulty: 2,
        type: 'Major 9th',
        symbol: 'Maj9',
        structure: [0, 4, 7, 11, 14]
      },
      minor9: {
        difficulty: 2,
        type: 'Minor 9th',
        symbol: 'm9',
        structure: [0, 3, 7, 10, 14]
      },
      dominant9: {
        difficulty: 2,
        type: 'Dominant 9th',
        symbol: '7',
        structure: [0, 4, 7, 10, 14]
      }

      // Advanced qualities

      // Experimental qualities
    };
  }
}
