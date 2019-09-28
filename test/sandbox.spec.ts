import { Note } from '../src';

import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Note Class', () => {
  describe('Method: random', () => {
    it('Should properly generate a random note', () => {
      expect(new Note()
      .toAlpha()
      .toNum()
      .transpose(12)
      .transpose(-35)).to.not.throw;
    });
  });
});
