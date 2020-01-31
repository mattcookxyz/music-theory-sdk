import { Chord } from '../../src';
import { describe, it } from 'mocha';
import * as chai from 'chai';
import { validChordWithFilter, validChordWithoutFilter } from "../../src/util/regex";

const expect = chai.expect;

describe('Chord Class', () => {

  it('Should throw upon attempted construction (static only for now)', () => {
    expect(() => new Chord()).to.throw();
    expect(() => new Chord('Blah')).to.throw();
  });

  describe('.random()', () => {
    it('Should properly generate a random chord', () => {
      for (let i = 0; i <= 50; i++) {
        const chord = Chord.random();
        expect(chord.value).to.match(validChordWithFilter);
      }
    });

    it('Should properly generate a random chord with destructuring', () => {
      for (let i = 0; i <= 50; i++) {
        const { root, quality, value } = Chord.random({ destructure: true });
        expect(value).to.match(validChordWithFilter);
      }
    });

    it('Should properly generate a random chord with flatSharpFilter set to false', () => {
      for (let i = 0; i <= 50; i++) {
        const chord = Chord.random({ flatSharpFilter: false });
        expect(chord.value).to.match(validChordWithoutFilter);
      }
    });

    it('Should properly generate a random chord with flatSharpFilter set explicitly', () => {
      for (let i = 0; i <= 50; i++) {
        const chord = Chord.random({ flatSharpFilter: 'b' });
        expect(chord.value).to.match(validChordWithoutFilter);
      }

      for (let i = 0; i <= 50; i++) {
        const chord = Chord.random({ flatSharpFilter: '#' });
        expect(chord.value).to.match(validChordWithoutFilter);
      }
    });
  });

  describe('.randomQuality()', () => {
    it('Should properly generate a random chord quality with no options provided', () => {
      for (let i = 0; i <= 50; i++) {
        const quality = Chord.randomQuality();
        expect(quality.difficulty <= 5 && quality.difficulty >= 1).to.be.true;
      }
    });

    it('Should properly generate a random chord quality with maxDifficulty opt provided', () => {
      for (let i = 0; i <= 50; i++) {
        const quality = Chord.randomQuality({ maxDifficulty: 1 });
        expect(quality.difficulty === 1).to.be.true;
      }

      for (let i = 0; i <= 50; i++) {
        const quality = Chord.randomQuality({ maxDifficulty: 2 });
        expect(quality.difficulty <= 2 && quality.difficulty >= 1).to.be.true;
      }
    });

    it('Should properly generate a random chord quality with targetDifficulty opt provided', () => {
      for (let i = 0; i <= 50; i++) {
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
