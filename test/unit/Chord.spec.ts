import { Chord } from '../../src';
import { describe, it } from 'mocha';
import * as chai from 'chai';
import { validChordWithFilter, validChordWithoutFilter } from "../../src/util/regex";

const expect = chai.expect;

const numCases = 10;

describe('Chord Class', () => {
  it('Should properly construct', () => {
    for (let i = 0; i <= numCases; i++) {
      const randomChord = Chord.random();
      const chord = new Chord(randomChord.value);
      expect(chord.root.alpha).to.equal(randomChord.root.alpha);
      expect(chord.root.absolute).to.equal(randomChord.root.absolute);
      expect(chord.quality).to.deep.equal(randomChord.quality);
    }
  });

  it('Should properly invert', () => {
    const chord = new Chord();
    chord.invert(2);
  });

  describe('.transpose()', () => {
    it('Should transpose all notes', () => {
      for (let i = 0; i <= numCases; i++) {
        const chord = Chord.random();
        const interval = Math.floor(Math.random() * 50);
        const expectedNotes = chord.notes.map(note => note.absolute + interval)
        chord.transpose(interval);
        expect(chord.notes.map(note => note.absolute)).to.deep.equal(expectedNotes);
      }
    });
  })

  describe('.random()', () => {
    it('Should properly generate a random chord', () => {
      for (let i = 0; i <= numCases; i++) {
        const chord = Chord.random();
        expect(validChordWithFilter.test(chord.value)).to.be.true;
      }
    });

    it('Should properly generate a random chord with flatSharpFilter set to false', () => {
      for (let i = 0; i <= numCases; i++) {
        const chord = Chord.random({ flatSharpFilter: false });
        expect(validChordWithoutFilter.test(chord.value)).to.be.true;
      }
    });

    it('Should properly generate a random chord with flatSharpFilter set explicitly', () => {
      for (let i = 0; i <= numCases; i++) {
        const chord = Chord.random({ flatSharpFilter: 'b' });
        expect(validChordWithoutFilter.test(chord.value)).to.be.true;
      }

      for (let i = 0; i <= numCases; i++) {
        const chord = Chord.random({ flatSharpFilter: '#' });
        expect(validChordWithoutFilter.test(chord.value)).to.be.true;
      }
    });
  });

  describe('.randomQuality()', () => {
    it('Should properly generate a random chord quality with no options provided', () => {
      for (let i = 0; i <= numCases; i++) {
        const quality = Chord.randomQuality();
        expect(quality.difficulty <= 5 && quality.difficulty >= 1).to.be.true;
      }
    });

    it('Should properly generate a random chord quality with maxDifficulty opt provided', () => {
      for (let i = 0; i <= numCases; i++) {
        const quality = Chord.randomQuality({ maxDifficulty: 1 });
        expect(quality.difficulty === 1).to.be.true;
      }

      for (let i = 0; i <= numCases; i++) {
        const quality = Chord.randomQuality({ maxDifficulty: 2 });
        expect(quality.difficulty <= 2 && quality.difficulty >= 1).to.be.true;
      }
    });

    it('Should properly generate a random chord quality with targetDifficulty opt provided', () => {
      for (let i = 0; i <= numCases; i++) {
        const quality = Chord.randomQuality({ targetDifficulty: 1 });
        expect(quality.difficulty === 1).to.be.true;
      }
    });

    it('Should throw on invalid opts', () => {
      const fail1 = () => Chord.randomQuality({ maxDifficulty: 5, targetDifficulty: 5 });
      const fail2 = () => Chord.randomQuality({ maxDifficulty: null, targetDifficulty: null });
      const fail3 = () => Chord.randomQuality({ targetDifficulty: 100 });
      const fail4 = () => Chord.randomQuality({ maxDifficulty: 100 });
      expect(fail1).to.throw();
      expect(fail2).to.throw();
      expect(fail3).to.throw();
      expect(fail4).to.throw();
    });
  });
});
