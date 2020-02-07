// Match chords filtered to only contain a flat or sharp (i.e. BbMaj7)
export const validChordWithFilter = /^[A-Ga-g][#|b]?[A-Za-z\u{00B0}\u{00F8}\+]*[0-9]*[b|#]*[0-9]{0,2}$/u;

// Match chords that may not be filtered to contain only a flat or sharp (i.e. A#/BbMaj7)
// tslint:disable-next-line
export const validChordWithoutFilter = /^[A-Ga-g][#|b]?(\/[A-Ga-g][#|b]?)?[A-Za-z\u{00B0}\u{00F8}\+]*[0-9]*[b|#]*[0-9]{0,2}$/u;

// Valid note patterns
// tslint:disable-next-line
export const validAlphaNote = /^[A-Ga-g][#|b|B]?(\/[A-Ga-g][#|b|B]?)?[0-9]{0,2}$/;
export const validNumericNote = /^-?[0-9]{0,3}$/;
