import { filter as lodashFilter } from 'lodash';
import Set from './Set';

/**
 * @class
 * @classdesc The Scale class provides scale structures and information
 */
export default class Scale {
  /**
   * This function gets an array of integers representing notes of a scale
   * @param {number|string} root - Root from which to build scale
   * @param {number[]} structure - Array representing the interval relationships for every note (including root)
   * @param {boolean} constrainToBaseOctave - Whether to keep notes within base octave [ 0 - 11 ]
   */
  static getScaleFromRoot(root, structure, constrainToBaseOctave = true) {
    return Set.applyStructureToRoot(root, structure, constrainToBaseOctave);
  }

  /**
   * Provides a random scale of the given difficulty (or below depending on the exclusively arg)
   * @param {number} difficulty - 1-5 - difficulty of scale candidates
   * @param {boolean} exclusively - Whether or not to constrain to the given difficulty, or allow easier scales
   */
  static random(difficulty = 5, exclusively = false) {
    const scales = Scale.allScalesWithDifficulty(difficulty, exclusively);
    return scales[Math.floor(Math.random() * scales.length)];
  }

  /**
   * Provides an array of scale objects
   * @param {number} difficulty - 1-5 - difficulty of scale candidates
   * @param {boolean} exclusively - Whether or not to constrain to the given difficulty, or allow easier scales
   */
  static allScalesWithDifficulty(difficulty = 4, exclusively = false) {
    return lodashFilter(Scale.allScales(), scale => {
      if (exclusively) {
        // If onlyThisDifficulty is true, only return scales of this difficulty
        return scale.difficulty === difficulty;
      } else {
        // Else return scales up to and including this difficulty
        return scale.difficulty <= difficulty;
      }
    });
  }

  /**
   * Takes in a root note, and returns the given structure built from the root
   * @param {number|string} root - Int 0-11 or alphaNote to build chord from as root
   * @param {number[]} structure - Array of chord members as chromatic integers from 0 as root
   * @param {boolean} constrainToBaseOctave - Whether to allow notes to extend beyond 11 (for audio playback)
   */
  static applyStructureToRoot(root, structure, constrainToBaseOctave = true) {
    return Set.applyStructureToRoot(root, structure, constrainToBaseOctave);
  }

  /**
   * Returns all programmed scales
   */
  static allScales() {
    return {
      // Basic scales

      major: {
        difficulty: 0,
        type: 'Major',
        structure: [0, 2, 4, 5, 7, 9, 11]
      },
      minor: {
        difficulty: 0,
        type: 'Minor',
        structure: [0, 2, 3, 5, 7, 8, 10]
      },

      // Basic+ scales

      dorian: {
        difficulty: 1,
        type: 'Dorian',
        structure: [0, 2, 3, 5, 7, 9, 10]
      }

      // Intermediate scales

      // Advanced scales

      // Experimental scales
    };
  }
}
