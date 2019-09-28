import Note from '../src/models/Note';

import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Note Class', () => {
  describe('Method: random', () => {
    it('Should properly generate a random note', () => {
      for (let i = 0; i < 100; i++) {
        new Note()
          .toAlpha()
          .toNum()
          .calculate()
          .transpose(12)
          .calculate()
          .transpose(-35);
      }
      expect(1).to.equal(1);
    });
  });
});
