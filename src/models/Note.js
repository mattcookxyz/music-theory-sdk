/**
 * Class for note-wise operations
 * @namespace Note
 */
export default class Note {
  /**
   * Generates a random note.
   * @memberof Note
   * @param {number} alpha - whether to return an alpha note ( 'C#' vs. 1 )
   * @param {string} flatSharpFilter - if asAlpha = true, 'b' or '#' will result in 'Db' or 'C#' instead of 'Db/C#'
   * @returns {string|number} a random note
   */
  static random(alpha = false, flatSharpFilter = false) {
    const note = Math.floor(Math.random() * 12);
    if (alpha) {
      return this.numericNoteToAlpha(note, flatSharpFilter);
    } else {
      return note;
    }
  }

  /**
   * Converts a numeric note (10) to alpha ('A#/Bb')
   * @memberof Note
   * @param {number} numNote - integer between 0 and 11, representing a chromatic note to convert to alpha
   * @param {string} flatSharpFilter - 'b' or '#' will result in 'Db' or 'C#' instead of 'Db/C#'
   * @returns {string} an alpha note ('A#/Bb')
   */
  static numericNoteToAlpha(numNote, flatSharpFilter = false) {
    // Convert to alpha
    while (numNote > 11) numNote -= 12;
    let alphaNote = toAlphaDict[numNote];

    // Split strings to only show flat or sharp note if argument flatSharpFilter is provided
    if (flatSharpFilter && alphaNote.search('/') !== -1) {
      switch (flatSharpFilter) {
        case '#':
          alphaNote = alphaNote.split('/')[0];
          break;
        case 'b':
          alphaNote = alphaNote.split('/')[1];
          break;
        default:
          throw Error(
            'Invalid flatSharpFilter argument given: ' + flatSharpFilter
          );
      }
    }

    return alphaNote;
  }

  /**
   * Converts an alpha note ('C') to numeric (0)
   * @memberof Note
   * @param {string} alphaNote - alpha note ('C') to convert to numeric note (0)
   * @returns {number} a numeric note (0)
   */
  static alphaNoteToNumeric(alphaNote) {
    return toNumDict[alphaNote];
  }

  /**
   * Applies a given interval to an alpha or numeric note
   * @memberof Note
   * @param {number|string} root - the note to transpose from
   * @param {number} interval - the interval to apply to the note
   * @param {boolean} constrainToBaseOctave - whether to keep the output note within the base octave, or 0-11 range
   * @param {string} flatSharpFilter - 'b' or '#' will result in 'Db' or 'C#' instead of 'Db/C#'
   * @returns {number|string} the note after application of given interval
   */
  static applyInterval(root, interval, constrainToBaseOctave = true, flatSharpFilter = false) {
    // If input root is alphaNote, convert to numeric for calculation
    let inputIsAlpha = false;
    if (typeof root === 'string') {
      root = Note.alphaNoteToNumeric(root);
      inputIsAlpha = true;
    }

    // Add interval
    let appliedInterval = root + interval;

    // If constrained to base octave, transpose down
    while (appliedInterval > 11 && constrainToBaseOctave === true) {
      appliedInterval -= 12;
    }

    // If the note started as alpha, return to alpha
    if (inputIsAlpha) {
      appliedInterval = Note.numericNoteToAlpha(appliedInterval, flatSharpFilter);
    }

    return appliedInterval;
  }
}

const toAlphaDict = {
  0: 'C',
  1: 'C#/Db',
  2: 'D',
  3: 'D#/Eb',
  4: 'E',
  5: 'F',
  6: 'F#/Gb',
  7: 'G',
  8: 'G#/Ab',
  9: 'A',
  10: 'A#/Bb',
  11: 'B'
};

const toNumDict = {
  C: 0,
  Db: 1,
  'C#': 1,
  D: 2,
  Eb: 3,
  'D#': 3,
  E: 4,
  F: 5,
  Gb: 6,
  'F#': 6,
  G: 7,
  Ab: 8,
  'G#': 8,
  A: 9,
  Bb: 10,
  'A#': 10,
  B: 11
};
