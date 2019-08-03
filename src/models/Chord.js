import { filter as lodashFilter } from 'lodash';
import Note from './Note';
import Set from './Set';

/**
 * Class for chord-wise operations
 * @namespace Chord
 */
export default class Chord {
  /**
   * Provides a random chord of the given difficulty (or below)
   * @memberof Chord
   * @param {number} difficulty - 0-4 - difficulty of chord candidates
   * @param {boolean} onlyThisDifficulty - constrain to the given difficulty, or allow easier chord qualities
   * @param {boolean} constrainToBaseOctave - keep notes within base octave [ 0 - 11 ]
   * @param {boolean|string} flatSharpFilter - constrain the output root to # or b for alphaChord
   * @returns {object} an object containing root, quality details, an alpha version of the chord, and numeric representation of the chord and its intervals
   */
  static random(
    difficulty = 5,
    onlyThisDifficulty = false,
    constrainToBaseOctave = true,
    flatSharpFilter = false
  ) {
    const qualities = Chord.allQualitiesWithDifficulty(difficulty, onlyThisDifficulty);
    const quality = qualities[Math.floor(Math.random() * qualities.length)];
    const root = Note.random();
    const alphaChord =
      Note.numNoteToAlpha(root, flatSharpFilter) + quality.symbol;
    const numChord = this.applyStructureToRoot(
      root,
      quality.structure,
      constrainToBaseOctave
    );
    return {
      root,
      quality,
      alphaChord,
      numChord
    };
  }

  /**
   * Provides a random chord quality of the given difficulty (or below)
   * @memberof Chord
   * @param {number} difficulty - 0-4 - difficulty of chord candidates
   * @param {boolean} onlyThisDifficulty - constrain to the given difficulty, or allow easier qualities
   * @returns {object} a random chord quality object
   */
  static randomQuality(difficulty = 5, onlyThisDifficulty = false) {
    const qualities = Chord.allQualitiesWithDifficulty(difficulty, onlyThisDifficulty);
    return qualities[Math.floor(Math.random() * qualities.length)];
  }

  /**
   * Get all qualities of given difficulty (including lower difficulties by default, per the exclusively arg)
   * @memberof Chord
   * @param {string} difficulty - 0 through 4 - difficulty of chord qualities to include (up to and including)
   * @param {boolean} onlyThisDifficulty - constrain to given difficulty, or allow easier qualities
   * @returns {Array.<object>} a set of chord quality objects
   */
  static allQualitiesWithDifficulty(difficulty = 4, onlyThisDifficulty = false) {
    return lodashFilter(Chord.allQualities(), quality => {
      if (onlyThisDifficulty) {
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
   * @memberof Chord
   * @param {number|string} root - Numeric note 0-11 or alphabetical note to build chord
   * @param {number[]} structure - Array of chord members as chromatic integers from 0 as root
   * @param {boolean} constrainToBaseOctave - whether to allow notes to extend beyond 11, or transpose to base octave
   * @param {boolean} alpha - whether to return as alphabetical chord members or numeric
   * @param {boolean|string} flatSharpFilter - constrain the output root to # or b for alphaChord
   * @returns {Array.<string|number>} an array of chord members
   */
  static applyStructureToRoot(
    root,
    structure,
    constrainToBaseOctave = true,
    alpha = false,
    flatSharpFilter = false
  ) {
    const numeric = Set.applyStructureToRoot(
      root,
      structure,
      constrainToBaseOctave
    );
    if (alpha) {
      const alpha = numeric.map(numericNote => {
        return Note.numNoteToAlpha(numericNote, flatSharpFilter);
      });
      return alpha;
    } else {
      return numeric;
    }
  }

  /**
   * Comprehensive list of chord qualities
   * @memberof Chord
   * @returns {object} an object containing all known chord qualities as objects
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
