export class Note {

  public numeric: number;
  public alpha: string;
  public octave: number;
  public absolute: number;
  public frequency: number;

  constructor(note: number|string = Math.floor(Math.random() * 12), octave: number = 4) {
    if (typeof note === 'string') {
      this.alpha = note;
      this.octave = octave;
      this.numeric = alphaToNumeric.get(note);
    } else if (typeof note === 'number') {
      const baselined = this.baseline(note, octave);
      this.octave = baselined.octave;
      this.alpha = numericToAlpha.get(baselined.numeric);
      this.numeric = baselined.numeric;
    }
    this.calculate();
  }

  private getFrequency() {
    this.frequency = 440 * Math.pow(2, (this.absolute - 57) / 12);
    return this;
  }

  private getAbsolute() {
    this.absolute = this.numeric + (12 * this.octave);
    return this;
  }

  private baseline(numeric: number, octave: number) {
    while (numeric > 11) {
      numeric -= 12;
      octave += 1;
    }
    while (numeric < 0) {
      numeric += 12;
      octave -= 1;
    }
    return { numeric, octave }
  }

  private calculate() {
    // Calculate absolute note value including octave
    this.getAbsolute();
    this.getFrequency();
    console.log(this);
    return this;
  }

  public randomize() {
    // Get random note
    this.numeric = getRandom() as number;
    this.alpha = numericToAlpha.get(this.numeric);
    this.calculate();
    return this;
  }

  public transpose(interval: number) {

    // Transpose
    this.numeric += interval;

    // Account for octave jumps, and keep
    // base note within 0-11
    const { numeric, octave } = this.baseline(this.numeric, this.octave);
    this.numeric = numeric;
    this.alpha = numericToAlpha.get(numeric);
    this.octave = octave;

    // Calculate absolute note value and return
    this.calculate();
    return this;
  }
}

const getRandom = (alpha: boolean = false, flatSharpFilter: boolean|string = false) => {
  // Get initial random numeric note
  let note: number|string = Math.floor(Math.random() * 12);

  // If numeric, convert to alpha note
  if (alpha) {
    note = numericToAlpha.get(note);

    // Apply filter if desired/needed
    if (flatSharpFilter && note.search('/') !== -1) {
      switch(flatSharpFilter) {
        case '#':
          note = note.split('/')[0];
          break;
        case 'b':
          note = note.split('/')[1];
          break;
        default:
          break;
      }
    }
  }

  return note;
}

const numericToAlpha = new Map([
  [0, 'C'],
  [1, 'C#/Db'],
  [2, 'D'],
  [3, 'D#/Eb'],
  [4, 'E'],
  [5, 'F'],
  [6, 'F#/Gb'],
  [7, 'G'],
  [8, 'G#/Ab'],
  [9, 'A'],
  [10, 'A#/Bb'],
  [11, 'B']
]);

const alphaToNumeric = new Map([
  ['C', 0],
  ['C#', 1],
  ['Db', 1],
  ['C#/Db', 1],
  ['D', 2],
  ['D#', 3],
  ['Eb', 3],
  ['D#/Eb', 3],
  ['E', 4],
  ['F', 5],
  ['F#', 6],
  ['Gb', 6],
  ['F#/Gb', 6],
  ['G', 7],
  ['G#', 8],
  ['Ab', 8],
  ['G#/Ab', 8],
  ['A', 9],
  ['A#', 10],
  ['Bb', 10],
  ['A#/Bb', 10],
  ['B', 11]
]);
