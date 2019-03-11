import Note from './Note'
import lodash from 'lodash';

export default class Chord {
    
    constructor () {}

    /**
     * 
     * @param {number or string} root - Int 0-11 or alphaNote to build chord from as root 
     * @param {number[]} structure - Array of chord members as chromatic integers from 0 as root
     * @param {boolean} constrainToBaseOctave - Whether to allow notes to extend beyond 11 (for audio playback)
     */
    static applyStructureToRoot ( root, structure, constrainToBaseOctave = true ) {

        let chord = [];

        // If input root is alphaNote, convert to numeric
        if ( typeof(root) === 'string' ) {
            root = Note.alphaNoteToNumeric(root);
        }

        // Apply and push each interval/chord member
        for (const note of structure) {
            chord.push( Note.applyInterval( root, note, constrainToBaseOctave ) );
        }

        return chord;

    }
}

export const randomQuality = ( difficulty = 5 ) => {
    const qualities = allQualitiesWithDifficulty(difficulty);
    return qualities[ Math.floor( Math.random() * qualities.length ) ];
}

/**
 * 
 * @param {string} difficulty - 1 through 5 (inclusive) - difficulty of chord qualities to include (up to and including)
 * @param {boolean} exclusively - If true, the function only returns qualities of this difficulty level
 */
export const allQualitiesWithDifficulty = ( difficulty = 5, exclusively = false ) => {
    return lodash.filter( allQualities, (quality) => {
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
export const allQualities = {

    // Basic qualities

    'major': {
        difficulty: 1,
        type: 'Major',
        symbol: 'Maj',
        structure: [ 0, 4, 7 ]
    },
    'minor': {
        difficulty: 1,
        type: 'Minor',
        symbol: 'm',
        structure: [ 0, 3, 7 ]
    },
    'diminished': {
        difficulty: 1,
        type: 'Diminished',
        symbol: '°',
        structure: [ 0, 3, 6 ]
    },

    // Basic+ qualities

    'augmented': {
        difficulty: 2,
        type: 'Augmented',
        symbol: '+',
        structure: [ 0, 4, 8 ]
    },
    'sus2': {
        difficulty: 2,
        type: 'Suspended 2nd',
        symbol: 'sus2',
        structure: [ 0, 2, 7 ]
    },
    'sus4': {
        difficulty: 2,
        type: 'Suspended 4th',
        symbol: 'sus4',
        structure: [ 0, 5, 7]
    },
    'dominant7': {
        difficulty: 2,
        type: 'Dominant 7th',
        symbol: '7',
        structure: [ 0, 4, 7, 10 ]
    },

    // Intermediate qualities

    'major7': {
        difficulty: 3,
        type: 'Major 7th',
        symbol: 'Maj7',
        structure: [ 0, 4, 7, 11 ]
    },
    'minor7': {
        difficulty: 3,
        type: 'Minor 7th',
        symbol: 'm7',
        structure: [ 0, 4, 7, 11 ]
    },
    'dim7': {
        difficulty: 3,
        type: 'Diminished 7th',
        symbol: '°7',
        structure: [ 0, 3, 6, 9 ]
    },
    'halfdim7': {
        difficulty: 3,
        type: 'Half Diminished 7th',
        symbol: 'ø7',
        structure: [ 0, 3, 6, 10 ]
    },
    'major9': {
        difficulty: 3,
        type: 'Major 9th',
        symbol: 'Maj9',
        structure: [ 0, 4, 7, 11, 14 ]
    },
    'minor9': {
        difficulty: 3,
        type: 'Minor 9th',
        symbol: 'm9',
        structure: [ 0, 3, 7, 10, 14 ]
    },
    'dominant9': {
        difficulty: 3,
        type: 'Dominant 9th',
        symbol: '7',
        structure: [ 0, 4, 7, 10, 14 ]
    }

    // Advanced qualities

    // Experimental qualities

}
