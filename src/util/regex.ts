// Match chords filtered to only contain a flat or sharp (i.e. BbMaj7)
export const validChordWithFilter = /^[A-Ga-g][#|b]?[A-Za-z\°\ø\+]*[0-9]*[b|#]*[0-9]{0,2}$/;

// Match chords that may not be filtered to contain only a flat or sharp (i.e. A#/BbMaj7)
// tslint:disable-next-line
export const validChordWithoutFilter = /^[A-Ga-g][#|b]?(\/[A-Ga-g][#|b]?)?[A-Za-z\°\ø\+]*[0-9]*[b|#]*[0-9]{0,2}$/;

// Valid note patterns
export const validAlphaNote = /^[A-Ga-g][#|b|B]?[0-9]{0,2}$/;
export const validNumericNote = /^-?[0-9]{0,3}$/;
