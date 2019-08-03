import Note from './Note';

/**
 * Class for set-wise operations
 * @namespace Set
 */
export default class Set {
  /**
   * Returns a set of twelve numeric notes, starting on the given root
   * @memberof Set
   * @param {number|string} root - the root note of your desired note set (numeric [0-11] or alpha ['C#'])
   * @returns {number[]} a numeric note set starting on the given root
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
   * @memberof Set
   * @returns {number[]} a numeric note set starting on a random root
   */
  static random() {
    const root = Note.random();

    // Transpose to use given root
    let notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return notes.slice(root).concat(notes.slice(0, root));
  }

  /**
   * Returns a set of twelve alphaNotes, starting on the given root
   * @memberof Set
   * @param {number|string} root - the root note of your desired note set (numeric [0-11] or alpha ['C#'])
   * @param {string} flatSharpFilter - 'b', or '#', will result in 'C#' or 'Db' over 'C#/Db'
   * @returns {string[]} a set of twelve alpha notes, starting on the given root
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
      return Note.numNoteToAlpha(numNote, flatSharpFilter);
    });

    return noteSet;
  }

  /**
   * Converts a set of alphaNotes (['C', 'Db/C#', 'D']) to numeric notes ([0, 1, 2])
   * @memberof Set
   * @param {number[]} alphaNoteSet - Set of integers between 0 and 11, representing a chromatic note array to convert to alphabetical notes ('C')
   * @returns {number[]} a numeric note set equivalent to the input alpha note set
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
   * @memberof Set
   * @param {number[]} alphaNoteSet - Set of integers between 0 and 11, representing a chromatic note array to convert to alphabetical notes ('C')
   * @param {string} flatSharpFilter - 'b', or '#', will result in 'C#' or 'Db' over 'C#/Db'
   * @returns {string[]} an alpha note set equivalent to the input numeric note set
   */
  static numericSetToAlpha(numNoteSet, flatSharpFilter = false) {
    let alphaSet = [];

    for (let numNote of numNoteSet) {
      alphaSet.push(Note.numNoteToAlpha(numNote, flatSharpFilter));
    }

    return alphaSet;
  }

  /**
   * Takes in a root note, and returns the given chord structure built from the root
   * @memberof Set
   * @param {number|string} root - integer 0-11 or alphaNote to build chord from as root
   * @param {number[]} structure - array of chord members representing intervals from the root
   * @param {boolean} constrainToBaseOctave - whether to allow notes to extend beyond 11, or transpose to base octave
   * @param {boolean} alpha - return chord members as alpha or numeric
   * @param {boolean|string} flatSharpFilter - 'b', or '#', will result in 'C#' or 'Db' over 'C#/Db'
   * @returns {number|string[]} a set of notes representing the given structure built off given root
   */
  static applyStructureToRoot(
    root,
    structure,
    constrainToBaseOctave = true,
    alpha = false,
    flatSharpFilter = false
  ) {
    let numeric = [];

    // If input root is alphaNote, convert to numeric
    if (typeof root === 'string') {
      root = Note.alphaNoteToNumeric(root);
    }

    // Apply and push each member of structure
    for (let note of structure) {
      numeric.push(Note.applyInterval(root, note, constrainToBaseOctave));
    }

    if (alpha) {
      const alpha = numeric.map(numericNote => {
        return Note.numNoteToAlpha(numericNote, flatSharpFilter);
      });
      return alpha;
    } else {
      return numeric;
    }
  }
}
