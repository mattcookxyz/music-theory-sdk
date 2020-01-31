// Match chords filtered to only contain a flat or sharp (i.e. BbMaj7)
export const ValidChordWithFilter = /^[A-Ga-g][#|b]?[A-Za-z\°\ø\+]*[0-9]*[b|#]*[0-9]{0,2}$/g.compile();

// Match chords that may not be filtered to contain only a flat or sharp (i.e. A#/BbMaj7)
export const ValidChordWithoutFilter = /^[A-Ga-g][#|b]?(\/[A-Ga-g][#|b]?)?[A-Za-z\°\ø\+]*[0-9]*[b|#]*[0-9]{0,2}$/g.compile();
