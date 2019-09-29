import { Note } from './Note';
import { sortBy, shuffle } from 'lodash';

export class Set {

  public notes: Note[];
  public ordered: boolean;
  public order: string|null;

  constructor(length: number = 0, random: boolean = false) {
    const notes: Note[] = [];

    if (random) {
      for (let i = 0; i < length; i += 1) {
        notes.push(new Note(Math.floor(Math.random() * 12), 4));
      }
    } else {
      for (let i = 0; i < length; i += 1) {
        notes.push(new Note(i, 4));
      }
    }

    this.notes = notes;
    this.ordered = !random;
    this.order = this.ordered ? 'ascending' : null;
    console.log(this);
  }

  public shuffle() {
    this.notes = shuffle(this.notes);
    this.ordered = false;
    this.order = null;
    return this;
  }

  public sortAscending() {
    this.notes = sortBy(this.notes, note => note.absolute);
    this.ordered = true;
    this.order = 'ascending';
    return this;
  }

  public sortDescending() {
    this.notes = sortBy(this.notes, note => -note.absolute);
    this.ordered = true;
    this.order = 'descending';
    return this;
  }

  public add(count: number = 1) {
    for (let i = 0; i < count; i += 1) {
      this.notes.push(new Note());
    }
    switch (this.order) {
      case 'ascending':
        this.sortAscending();
        break;
      case 'descending':
        this.sortDescending();
        break;
      default:
        break;
    }
    return this;
  }

  public remove(count: number) {
    const numToRemove = this.notes.length - count || 0;
    this.notes = this.notes.slice(0, numToRemove);
    return this;
  }
}
