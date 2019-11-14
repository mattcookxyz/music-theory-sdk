import { Note } from '../src';
import { describe, it } from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;

describe('sandbox', () => {
  it('Should do something', () => {
    const note = Note.baseline(12, 5);
    console.log(note);
  });
});
