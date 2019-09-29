import { Note } from './Note';
import { sortBy, shuffle } from 'lodash';

export class Set {

  public notes: Note[];
  public ordered: boolean;
  public order: string|null;

  constructor(length: number = 12, random: boolean = false) {
    const notes: Note[] = [];

    if (random) {
      for (let i = 0; i < length; i += 1) {
        notes.push(Note.generate(Math.floor(Math.random() * 12), 4));
      }
    } else {
      for (let i = 0; i < length; i += 1) {
        notes.push(Note.generate(i, 4));
      }
    }

    this.notes = notes;
    this.ordered = !random && length > 0;
    this.order = this.ordered ? 'ascending' : null;
  }

  public static from(notes: Note[]|number[]|string[]) {
    const set = new Set(0);
    for (let i = 0; i < notes.length; i += 1) {
      if (!(notes[i] instanceof Note)) {
        const toPush = new Note(notes[i] as number|string);
        while (notes[i - 1] && toPush.absolute <= (set.notes[i - 1] as Note).absolute) {
          toPush.transpose(12);
        }
        set.push(toPush);
      } else {
        set.push(notes[i] as Note);
      }
    }
    return set;
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

  public set(notes: Note[]) {
    this.notes = notes;
    this.ordered = false;
    this.order = null;
  }

  public push(note: Note) {
    this.notes.push(note);
    this.retainOrder();
  }

  public static sortAscending(notes: Note[]) {
    return sortBy(notes, note => note.absolute);
  }

  public static sortDescending(notes: Note[]) {
    return sortBy(notes, note => -note.absolute);
  }

  public add(count: number = 1) {
    for (let i = 0; i < count; i += 1) {
      this.notes.push(new Note());
    }
    this.retainOrder();
    return this;
  }

  public remove(count: number) {
    const numToRemove = this.notes.length - count || 0;
    this.notes = this.notes.slice(0, numToRemove);
    return this;
  }

  private retainOrder() {
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
  }
}
