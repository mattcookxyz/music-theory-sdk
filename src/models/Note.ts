export class Note {

  public numeric: number;
  public alpha: string;
  public octave: number;
  public absolute: number;
  public frequency: number;

  constructor(note?: string|number, octave?: number) {
    this.generate(note || undefined, octave || undefined);
  }

  // Alternative way to construct a Note object
  public static generate(note?: number|string, octave?: number) {
    return new Note(note, octave);
  }

  public generate(note: number|string = Math.floor(Math.random() * 12), octave: number = 4) {
    if (typeof note === 'string') {
      this.generateFromString(note, octave);
    } else if (typeof note === 'number') {
      this.generateFromNumber(note, octave);
    } else {
      throw Error(`Note input type ${typeof note} is not supported.`);
    }
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
    this.baseline();
    this.alpha = numericToAlpha.get(this.numeric);
    // Calculate absolute note value and return
    this.calculate();
    return this;
  }

  private generateFromNumber(note: number, octave: number) {
    this.octave = octave;
    this.setNumeric(note);
    this.alpha = numericToAlpha.get(this.numeric);
    this.calculate();
  }

  private generateFromString(note: string, octave?: number) {
    // Allow input like 'C#4'
    const indexOfNum = note.search(/[0-9]/g);
    if (indexOfNum !== -1) {
      this.alpha = note.slice(0, indexOfNum);
      this.octave = parseInt(note.slice(indexOfNum));
      this.setNumeric(alphaToNumeric.get(this.alpha));
      this.calculate();
    } else {
      this.alpha = note;
      this.octave = octave;
      this.setNumeric(alphaToNumeric.get(note));
      this.calculate();
    }
  }

  private setNumeric(number: number) {
    this.numeric = number;
    this.baseline();
    this.calculate();
    return this;
  }

  private baseline() {
    while (this.numeric > 11) {
      this.numeric -= 12;
      this.octave += 1;
    }
    while (this.numeric < 0) {
      this.numeric += 12;
      this.octave -= 1;
    }
    return this;
  }

  private calculate() {
    // Calculate absolute note value including octave
    this.getAbsolute();
    this.getFrequency();
    return this;
  }

  private getFrequency() {
    // Calculate and assign frequency
    this.frequency = 440 * Math.pow(2, (this.absolute - 57) / 12);
    return this;
  }

  private getAbsolute() {
    // Calculate and assign absolute value of note
    this.absolute = this.numeric + (12 * this.octave);
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
