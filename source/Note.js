export default class Note {

    /**
     * 
     * @param {number or alphaNote} root - The root note of your desired note set (numeric [0-11] or alpha ['C#'])
     */
    static getNumericNoteSetFromRoot ( root = 0 ) {

        // If input root is alphaNote, convert to numeric
        if (typeof(root) === 'string') {
            root = this.alphaNoteToNumeric(root);
        }

        // Transpose to use given root
        let notes = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
        return notes.slice(root).concat(notes.slice(0, root));

    }

    /**
     * 
     * @param {number or alphaNote} root - The root note of your desired note set (numeric [0-11] or alpha ['C#'])
     */
    static getAlphaNoteSetFromRoot ( root = 0, flatSharpFilter = false ) {

        // Get numeric note set from given root
        let noteSet = this.getNumericNoteSetFromRoot(root);

        // Convert each note to alphaNote
        noteSet = noteSet.map((numNote) => {
            return this.numericNoteToAlpha(numNote, flatSharpFilter)
        });

        return noteSet;

    }

    /**
     * 
     * @param {number} numNote - Int between 0 and 11, representing a chromatic note to convert to alphaNote ('C')
     * @param {string} flatSharpFilter - 'b' or '#' depending on desired output
     */
    static numericNoteToAlpha ( numNote, flatSharpFilter = false ) {

        // Convert to alpha
        let alphaNote = toAlphaDict[numNote];

        // Split strings to only show flat or sharp note if argument flatSharpFilter is provided
        if ( flatSharpFilter && alphaNote.search('/') !== -1 ) {
            switch (flatSharpFilter) {
                case 'b':
                    alphaNote = alphaNote.split('/')[0];
                    break;
                case '#':
                    alphaNote = alphaNote.split('/')[1];
                    break;
                default:
                    throw Error('Invalid flatSharpFilter argument given: ' + flatSharpFilter);
            }
        }

        return alphaNote;
        
    }

    /**
     * 
     * @param {number[]} numNoteSet - Set of int between 0 and 11, representing a chromatic note array to convert to alphaNotes ('C')
     */
    static numericSetToAlpha ( numNoteSet, flatSharpFilter = false ) {

        let alphaSet = [];

        for ( const numNote of numNoteSet ) {
            alphaSet.push(this.numericNoteToAlpha(numNote, flatSharpFilter));
        }

        return alphaSet;

    }

    /**
     * 
     * @param {string} alphaNote - alphaNote ('C') to convert to numNote (0)
     */
    static alphaNoteToNumeric ( alphaNote ) {
        return toNumDict[alphaNote]
    }

    /**
     * 
     * @param {number[]} numNoteSet - Set of int between 0 and 11, representing a chromatic note array to convert to alphaNotes ('C')
     */
    static alphaSetToNumeric ( alphaNoteSet ) {

        let numSet = [];

        // Convert each alphaNote in array to numeric
        for ( const alphaNote of alphaNoteSet ) {
            numSet.push(this.alphaNoteToNumeric(alphaNote));
        }

        return numSet;

    }

    static applyInterval ( root, interval, constrainToBaseOctave = true ) {

        // If input root is alphaNote, convert to numeric
        if ( typeof(root) === 'string' ) {
            root = NoteTool.alphaNoteToNumeric(root);
        }
    
        // Add interval
        let appliedInterval = root + interval;
    
        // If constrained to base octave, transpose down
        while ( appliedInterval > 11 && constrainToBaseOctave === true ) {
            appliedInterval -= 12;
        }
    
        return appliedInterval;
    
    }

}

const toAlphaDict = { 
    0: 'C', 
    1: 'Db/C#', 
    2: 'D', 
    3: 'Eb/D#', 
    4: 'E', 
    5: 'F', 
    6: 'Gb/F#', 
    7: 'G', 
    8: 'Ab/G#', 
    9: 'A', 
    10: 'Bb/A#', 
    11: 'B' 
};

const toNumDict = { 
    'C': 0,
    'Db': 1,
    'C#': 1,
    'D': 2,
    'Eb': 3,
    'D#': 3,
    'E': 4,
    'F': 5,
    'Gb': 6,
    'F#': 6,
    'G': 7,
    'Ab': 8,
    'G#': 8,
    'A': 9,
    'Bb': 10,
    'A#': 10,
    'B': 11
}
