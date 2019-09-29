import { Note, Set } from '../src';

import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Note Class', () => {
  describe('Method: random', () => {
    it('Should properly generate a random note', () => {
      const note = new Note(-1, 4);
      note.transpose(10);
    });
  });
});
