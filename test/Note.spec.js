import Note from '../source/models/Note';

import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Note Class', () => {
  describe('Method: numericNoteToAlpha', () => {
    it('Should properly convert numeric notes to alpha', () => {
      expect(Note.numericNoteToAlpha(0)).to.equal('C');
      expect(Note.numericNoteToAlpha(1)).to.equal('C#/Db');
      expect(Note.numericNoteToAlpha(2)).to.equal('D');
      expect(Note.numericNoteToAlpha(3)).to.equal('D#/Eb');
      expect(Note.numericNoteToAlpha(4)).to.equal('E');
      expect(Note.numericNoteToAlpha(5)).to.equal('F');
      expect(Note.numericNoteToAlpha(6)).to.equal('F#/Gb');
      expect(Note.numericNoteToAlpha(7)).to.equal('G');
      expect(Note.numericNoteToAlpha(8)).to.equal('G#/Ab');
      expect(Note.numericNoteToAlpha(9)).to.equal('A');
      expect(Note.numericNoteToAlpha(10)).to.equal('A#/Bb');
      expect(Note.numericNoteToAlpha(11)).to.equal('B');
    });

    it('Should properly filter by sharp and flat', () => {
      expect(Note.numericNoteToAlpha(1, 'b')).to.equal('Db');
      expect(Note.numericNoteToAlpha(1, '#')).to.equal('C#');
      expect(Note.numericNoteToAlpha(3, 'b')).to.equal('Eb');
      expect(Note.numericNoteToAlpha(3, '#')).to.equal('D#');
      expect(Note.numericNoteToAlpha(6, 'b')).to.equal('Gb');
      expect(Note.numericNoteToAlpha(6, '#')).to.equal('F#');
      expect(Note.numericNoteToAlpha(8, 'b')).to.equal('Ab');
      expect(Note.numericNoteToAlpha(8, '#')).to.equal('G#');
      expect(Note.numericNoteToAlpha(10, 'b')).to.equal('Bb');
      expect(Note.numericNoteToAlpha(10, '#')).to.equal('A#');
    });
  });

  describe('Method: alphaNoteToNumeric', () => {
    it('Should properly convert all alpha notes to numeric', () => {
      expect(Note.alphaNoteToNumeric('C')).to.equal(0);
      expect(Note.alphaNoteToNumeric('Db')).to.equal(1);
      expect(Note.alphaNoteToNumeric('C#')).to.equal(1);
      expect(Note.alphaNoteToNumeric('D')).to.equal(2);
      expect(Note.alphaNoteToNumeric('Eb')).to.equal(3);
      expect(Note.alphaNoteToNumeric('D#')).to.equal(3);
      expect(Note.alphaNoteToNumeric('E')).to.equal(4);
      expect(Note.alphaNoteToNumeric('F')).to.equal(5);
      expect(Note.alphaNoteToNumeric('Gb')).to.equal(6);
      expect(Note.alphaNoteToNumeric('F#')).to.equal(6);
      expect(Note.alphaNoteToNumeric('G')).to.equal(7);
      expect(Note.alphaNoteToNumeric('Ab')).to.equal(8);
      expect(Note.alphaNoteToNumeric('G#')).to.equal(8);
      expect(Note.alphaNoteToNumeric('A')).to.equal(9);
      expect(Note.alphaNoteToNumeric('Bb')).to.equal(10);
      expect(Note.alphaNoteToNumeric('A#')).to.equal(10);
      expect(Note.alphaNoteToNumeric('B')).to.equal(11);
    });
  });

  describe('Method: applyInterval', () => {
    it('Should properly add an interval to a note while constrained to base octave', () => {
      expect(Note.applyInterval(0, 4)).to.equal(4);
      expect(Note.applyInterval(11, 3)).to.equal(2);
    });

    it('Should properly add an interval to a note while NOT constrained to base octave', () => {
      expect(Note.applyInterval(8, 24, false)).to.equal(32);
      expect(Note.applyInterval(11, 3, false)).to.equal(14);
    });
  });
});
