import { Note, Set } from '../src';

import { describe, it } from 'mocha';
import { expect } from 'chai';
import { applyStructureToRoot, Chord, qualities } from '../src/models/Chord';

describe('Note Class', () => {
  describe('Method: random', () => {
    it('Should properly generate a random note', () => {
      const chord = Note.generate(0, 5);
      console.log(chord);
    });
  });
});
