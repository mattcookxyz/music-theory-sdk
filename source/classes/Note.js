/**
 * @class
 * @classdesc The Note class provides methods to parse, convert, and transpose individual notes
 */
export default class Note {
  /**
   * Converts a numeric note (0) to alphaNote ('C')
   * @param {number} numNote - Int between 0 and 11, representing a chromatic note to convert to alphaNote ('C')
   * @param {string} flatSharpFilter - 'b' or '#' depending on desired output
   */
  static random(asAlpha = false, flatSharpFilter = false) {
    const note = Math.floor(Math.random() * 12);
    if (asAlpha) {
      return this.numericNoteToAlpha(note, flatSharpFilter);
    } else {
      return note;
    }
  }

  /**
   * Converts a numeric note (0) to alphaNote ('C')
   * @param {number} numNote - Int between 0 and 11, representing a chromatic note to convert to alphaNote ('C')
   * @param {string} flatSharpFilter - 'b' or '#' depending on desired output
   */
  static numericNoteToAlpha(numNote, flatSharpFilter = false) {
    // Convert to alpha
    if (numNote > 11) numNote -= 12;
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
   * Converts an alphaNote ('C') to numeric (0)
   * @param {string} alphaNote - alphaNote ('C') to convert to numNote (0)
   */
  static alphaNoteToNumeric(alphaNote) {
    return toNumDict[alphaNote];
  }

  /**
   *
   * @param {number|string} root - The note to transpose from
   * @param {number} interval - The interval to apply to the note
   * @param {boolean} constrainToBaseOctave - Whether to keep the output note within the 0-11 range
   */
  static applyInterval(root, interval, constrainToBaseOctave = true) {
    // If input root is alphaNote, convert to numeric
    if (typeof root === 'string') {
      root = Note.alphaNoteToNumeric(root);
    }

    // Add interval
    let appliedInterval = root + interval;

    // If constrained to base octave, transpose down
    while (appliedInterval > 11 && constrainToBaseOctave === true) {
      appliedInterval -= 12;
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
