import lodash from "lodash";

/**
 * This is the Chord class
 * @class
 */
export default class Chord {
  constructor() {}

  /**
   * Provides a random chord quality of the given difficulty (or below depending on the exclusively arg)
   * @param {number} difficulty - 1-5 - difficulty of chord candidates
   * @param {boolean} exclusively - Whether or not to constrain to the given difficulty, or allow easier notes
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
    return lodash.filter(Chord.allQualities(), quality => {
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
   * Comprehensive list of chord qualities
   */
  static allQualities() {
    return {
      // Basic qualities

      major: {
        difficulty: 0,
        type: "Major",
        symbol: "Maj",
        structure: [0, 4, 7]
      },
      minor: {
        difficulty: 0,
        type: "Minor",
        symbol: "m",
        structure: [0, 3, 7]
      },
      diminished: {
        difficulty: 0,
        type: "Diminished",
        symbol: "°",
        structure: [0, 3, 6]
      },

      // Basic+ qualities

      augmented: {
        difficulty: 1,
        type: "Augmented",
        symbol: "+",
        structure: [0, 4, 8]
      },
      sus2: {
        difficulty: 1,
        type: "Suspended 2nd",
        symbol: "sus2",
        structure: [0, 2, 7]
      },
      sus4: {
        difficulty: 1,
        type: "Suspended 4th",
        symbol: "sus4",
        structure: [0, 5, 7]
      },
      dominant7: {
        difficulty: 1,
        type: "Dominant 7th",
        symbol: "7",
        structure: [0, 4, 7, 10]
      },

      // Intermediate qualities

      major7: {
        difficulty: 2,
        type: "Major 7th",
        symbol: "Maj7",
        structure: [0, 4, 7, 11]
      },
      minor7: {
        difficulty: 2,
        type: "Minor 7th",
        symbol: "m7",
        structure: [0, 4, 7, 11]
      },
      dim7: {
        difficulty: 2,
        type: "Diminished 7th",
        symbol: "°7",
        structure: [0, 3, 6, 9]
      },
      halfdim7: {
        difficulty: 2,
        type: "Half Diminished 7th",
        symbol: "ø7",
        structure: [0, 3, 6, 10]
      },
      major9: {
        difficulty: 2,
        type: "Major 9th",
        symbol: "Maj9",
        structure: [0, 4, 7, 11, 14]
      },
      minor9: {
        difficulty: 2,
        type: "Minor 9th",
        symbol: "m9",
        structure: [0, 3, 7, 10, 14]
      },
      dominant9: {
        difficulty: 2,
        type: "Dominant 9th",
        symbol: "7",
        structure: [0, 4, 7, 10, 14]
      }

      // Advanced qualities

      // Experimental qualities
    };
  }
}
