export class Note {

  public value: number|string;
  public alpha: boolean;
  public octave: number;
  public absolute: number;
  public frequency: number;

  constructor(note: number|string = Math.floor(Math.random() * 12), octave: number = 4) {
    this.value = note;
    this.alpha = typeof note === 'string';
    this.octave = octave;
    this.calculate();
  }

  getFrequency() {
    this.frequency = 440 * Math.pow(2, (this.absolute - 57) / 12);
    return this;
  }

  getAbsolute() {
    if (typeof this.value === 'number') {
      this.absolute = this.value + (12 * this.octave);
    } else if (typeof this.value ==='string') {
      this.absolute = alphaToNumeric.get(this.value) + (12 * this.octave);
    } else {
      // Note can only be a number or string
      throw Error(`Unsupported note type: ${typeof this.value}`)
    }
    return this;
  }

  randomize(flatSharpFilter: boolean|string) {
    // Get random note
    this.value = getRandom(this.alpha || typeof(this.value) === 'string', flatSharpFilter);
    this.calculate();
    return this;
  }

  calculate() {
    // Calculate absolute note value including octave
    this.getAbsolute();
    this.getFrequency();
    console.log(this);
    return this;
  }

  toNum() {
    // Convert to numeric if needed
    if (this.alpha) {
      this.value = alphaToNumeric.get(this.value as string);
      this.alpha = false;
      this.calculate();
    }
    return this;
  }

  toAlpha() {
    // Convert to alpha if needed
    if (!this.alpha) {
      this.value = numericToAlpha.get(this.value as number);
      this.alpha = true;
      this.calculate();
    }
    return this;
  }

  transpose(interval: number) {

    // If alpha, converts note,
    // and converts back at end of calculation
    let tempNumeric;
    if (this.alpha) {
      tempNumeric = true;
      this.toNum();
    }

    // Transpose
    (this.value as number) += interval;

    // Account for octave jumps, and keep
    // base note within 0-11
    while (this.value >= 12) {
      (this.value as number) -= 12;
      this.octave += 1;
    }
    while (this.value < 0) {
      (this.value as number) += 12;
      this.octave -= 1;
    }

    // Convert back to alpha if needed
    if (tempNumeric) {
      this.value = numericToAlpha.get(this.value as number);
    }

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
