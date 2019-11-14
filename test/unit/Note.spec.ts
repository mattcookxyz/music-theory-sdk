import { Note } from '../../src';
import { describe, it } from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;

describe('Note Class', () => {
  describe('Method: random', () => {
    it('Should properly parse an input note', () => {
      let note = new Note(-24);
      expect(note.alpha).to.equal('C');
      expect(note.numeric).to.equal(0);
      expect(note.octave).to.equal(2);
      expect(note.absolute).to.equal(24);

      note = new Note(25);
      expect(note.alpha).to.equal('C#/Db');
      expect(note.numeric).to.equal(1);
      expect(note.octave).to.equal(6);
      expect(note.absolute).to.equal(73);

      note = new Note('Bb6');
      expect(note.alpha).to.equal('Bb');
      expect(note.numeric).to.equal(10);
      expect(note.octave).to.equal(6);
      expect(note.absolute).to.equal(82);

      note = new Note('C4');
      expect(note.alpha).to.equal('C');
      expect(note.numeric).to.equal(0);
      expect(note.octave).to.equal(4);
      expect(note.absolute).to.equal(48);

      note = new Note('C#4');
      expect(note.alpha).to.equal('C#');
      expect(note.numeric).to.equal(1);
      expect(note.octave).to.equal(4);
      expect(note.absolute).to.equal(49);
    });

    it('Should properly generate a random note', () => {
      const note = new Note();
      expect(note.numeric).to.be.a('number');
      expect(note.absolute).to.be.a('number');
      expect(note.alpha).to.be.a('string');
      expect(note.frequency).to.be.a('number');
    });

    it('Should properly baseline a numeric note', () => {
      const res1 = Note.baseline(12, 5);
      expect(res1.numeric).to.equal(0);
      expect(res1.octave).to.equal(6);

      const res2 = Note.baseline(-1, 6);
      expect(res2.numeric).to.equal(11);
      expect(res2.octave).to.equal(5);

      const res3 = Note.baseline(-12);
      expect(res3.numeric).to.equal(0);
      expect(res3.octave).to.equal(3);
    });

    it('Should properly parse notes', () => {
      const noteC = new Note('C');
      const noteNeg1 = new Note(-1);
      const noteB = new Note('B');
      const note12 = new Note(12);

      // Check alpha values
      expect(noteC.alpha).to.equal('C');
      expect(noteNeg1.alpha).to.equal('B');
      expect(noteB.alpha).to.equal('B');
      expect(note12.alpha).to.equal('C');

      // Check numeric values
      expect(noteC.numeric).to.equal(0);
      expect(noteNeg1.numeric).to.equal(11);
      expect(noteB.numeric).to.equal(11);
      expect(note12.numeric).to.equal(0);

      // Check octave values
      expect(noteC.octave).to.equal(4);
      expect(noteNeg1.octave).to.equal(3);
      expect(noteB.octave).to.equal(4);
      expect(note12.octave).to.equal(5);
    });

    it('Should correctly transpose values', function () {
      // C4
      const note = new Note('C');
      expect(note.alpha).to.equal('C');
      expect(note.numeric).to.equal(0);
      expect(note.octave).to.equal(4);
      expect(note.absolute).to.equal(48);

      // Transpose to C5
      note.transpose(12);
      expect(note.alpha).to.equal('C');
      expect(note.numeric).to.equal(0);
      expect(note.octave).to.equal(5);
      expect(note.absolute).to.equal(60);

      // Transpose to B2
      note.transpose(-25);
      expect(note.alpha).to.equal('B');
      expect(note.numeric).to.equal(11);
      expect(note.octave).to.equal(2);
      expect(note.absolute).to.equal(35);
    });
  });
});
