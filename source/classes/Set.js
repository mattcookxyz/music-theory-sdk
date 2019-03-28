import Note from './Note';

/**
 * @class
 */
export default class Set {
  /**
   * Returns a set of twelve numeric notes, starting on the given root
   * @param {number|string} root - The root note of your desired note set (numeric [0-11] or alpha ['C#'])
   */
  static getNumericNoteSet(root = 0) {
    // If input root is alphaNote, convert to numeric
    if (typeof root === 'string') {
      root = Note.alphaNoteToNumeric(root);
    }

    // Transpose to use given root
    let notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return notes.slice(root).concat(notes.slice(0, root));
  }

  /**
   * Returns a set of twelve numeric notes, starting on a random root
   */
  static random() {
    const root = Note.random();

    // Transpose to use given root
    let notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return notes.slice(root).concat(notes.slice(0, root));
  }

  /**
   * Returns a set of twelve alphaNotes, starting on the given root
   * @param {number|string} root - The root note of your desired note set (numeric [0-11] or alpha ['C#'])
   * @param {string} flatSharpFilter - 'b' or '#' depending on desired output
   */
  static getAlphaNoteSet(root = 0, flatSharpFilter = false) {
    // Convert to numeric if alphaNote given
    if (typeof root === 'string') {
      root = Note.alphaNoteToNumeric(root);
    }

    // Get numeric note set from given root
    let noteSet = Set.getNumericNoteSet(root);

    // Convert each note to alphaNote
    noteSet = noteSet.map(numNote => {
      return Note.numericNoteToAlpha(numNote, flatSharpFilter);
    });

    return noteSet;
  }

  /**
   * Converts a set of alphaNotes (['C', 'Db/C#', 'D']) to numeric notes ([0, 1, 2])
   * @param {number[]} alphaNoteSet - Set of int between 0 and 11, representing a chromatic note array to convert to alphaNotes ('C')
   */
  static alphaSetToNumeric(alphaNoteSet) {
    let numSet = [];

    // Convert each alphaNote in array to numeric
    for (const alphaNote of alphaNoteSet) {
      numSet.push(Note.alphaNoteToNumeric(alphaNote));
    }

    return numSet;
  }

  /**
   * Converts a set of numeric notes ([0, 1, 2]) to alphaNotes (['C', 'Db/C#', 'D'])
   * @param {number[]} numNoteSet - Set of int between 0 and 11, representing a chromatic note array to convert to alphaNotes ('C')
   * @param {string} flatSharpFilter - 'b' or '#' depending on desired output
   */
  static numericSetToAlpha(numNoteSet, flatSharpFilter = false) {
    let alphaSet = [];

    for (let numNote of numNoteSet) {
      alphaSet.push(Note.numericNoteToAlpha(numNote, flatSharpFilter));
    }

    return alphaSet;
  }

  /**
   * Takes in a root note, and returns the given chord structure built from the root
   * @param {number|string} root - Int 0-11 or alphaNote to build chord from as root
   * @param {number[]} structure - Array of chord members as chromatic integers from 0 as root
   * @param {boolean} constrainToBaseOctave - Whether to allow notes to extend beyond 11 (for audio playback)
   * @param {boolean} isAlpha - Whether to return in as alphabetical chord members or numeric
   * @param {boolean|string} flatSharpFilter - Whether to filter alphabetical chord members to flats or sharps
   */
  static applyStructureToRoot(root, structure, constrainToBaseOctave = true, isAlpha = false, flatSharpFilter = false) {
    let numeric = [];

    // If input root is alphaNote, convert to numeric
    if (typeof root === 'string') {
      root = Note.alphaNoteToNumeric(root);
    }

    // Apply and push each member of structure
    for (let note of structure) {
      numeric.push(Note.applyInterval(root, note, constrainToBaseOctave));
    }

    if (isAlpha) {
      const alpha = numeric.map((numericNote) => {
          return Note.numericNoteToAlpha(numericNote, flatSharpFilter);
      });
      return alpha;
    } else {
      return numeric;
    }
  }
}
