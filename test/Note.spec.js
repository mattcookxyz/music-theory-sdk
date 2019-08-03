import Note from '../src/models/Note';

import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Note Class', () => {
  describe('Method: numNoteToAlpha', () => {
    it('Should properly convert numeric notes to alpha', () => {
      expect(Note.numNoteToAlpha(0)).to.equal('C');
      expect(Note.numNoteToAlpha(1)).to.equal('C#/Db');
      expect(Note.numNoteToAlpha(2)).to.equal('D');
      expect(Note.numNoteToAlpha(3)).to.equal('D#/Eb');
      expect(Note.numNoteToAlpha(4)).to.equal('E');
      expect(Note.numNoteToAlpha(5)).to.equal('F');
      expect(Note.numNoteToAlpha(6)).to.equal('F#/Gb');
      expect(Note.numNoteToAlpha(7)).to.equal('G');
      expect(Note.numNoteToAlpha(8)).to.equal('G#/Ab');
      expect(Note.numNoteToAlpha(9)).to.equal('A');
      expect(Note.numNoteToAlpha(10)).to.equal('A#/Bb');
      expect(Note.numNoteToAlpha(11)).to.equal('B');
    });

    it('Should properly filter by sharp and flat', () => {
      expect(Note.numNoteToAlpha(1, 'b')).to.equal('Db');
      expect(Note.numNoteToAlpha(1, '#')).to.equal('C#');
      expect(Note.numNoteToAlpha(3, 'b')).to.equal('Eb');
      expect(Note.numNoteToAlpha(3, '#')).to.equal('D#');
      expect(Note.numNoteToAlpha(6, 'b')).to.equal('Gb');
      expect(Note.numNoteToAlpha(6, '#')).to.equal('F#');
      expect(Note.numNoteToAlpha(8, 'b')).to.equal('Ab');
      expect(Note.numNoteToAlpha(8, '#')).to.equal('G#');
      expect(Note.numNoteToAlpha(10, 'b')).to.equal('Bb');
      expect(Note.numNoteToAlpha(10, '#')).to.equal('A#');
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

    it('Should return accurate results FOR an alpha note AS an alpha note', () => {
      expect(Note.applyInterval('C', 3, true)).to.equal('D#/Eb');
      expect(Note.applyInterval('C', 3, false)).to.equal('D#/Eb');
      expect(Note.applyInterval('C', 15, false)).to.equal('D#/Eb');
      expect(Note.applyInterval('C', 15, false, '#')).to.equal('D#');
      expect(Note.applyInterval('C', 15, false, 'b')).to.equal('Eb');
    })
  });
});
